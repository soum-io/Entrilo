from amadeus import Client, ResponseError
import networkx as nx
import json
import time
import matplotlib

amadeus = Client(
        client_id = '01kBKVCiSvkcgZgC33ASxyiDGMXHC3te',
        client_secret = '6zcvK3TOsVqWNIGc'
)


# returns a set of source, dest pairs for every combo of source and destination
def get_source_dest_pairs(sources, dests):
    sd_pairs = set()
    for source in sources:
        for dest in dests:
            source_dest = (source, dest)
            sd_pairs.add(source_dest)
    
    return sd_pairs

# d_a is a string that is either 'D' or 'A' to indicate departure or arrival
def create_node_tag(airport_code, d_a, flight_no):
    tag = airport_code + '-' + d_a + '-' + flight_no
    
    return tag

def create_edge_tag(source_node_tag, dest_node_tag):
    tag = source_node_tag + dest_node_tag

    return tag

def get_leg_price(departure_code, arrival_code, departure_date, carrier_code, flight_no):
    response = amadeus.shopping.flight_offers.get(origin=departure_code, destination=arrival_code, departureDate=departure_date, nonStop='true')
    offer_items = response.data
    for offer_item in offer_items:
        segment = offer_item['offerItems'][0]['services'][0]['segments'][0]['flightSegment']
        if segment['carrierCode'] == carrier_code and segment['number'] == flight_no:
            price = int(float(offer_item['offerItems'][0]['pricePerAdult']['total']) + float(offer_item['offerItems'][0]['pricePerAdult']['totalTaxes']))
            return price
        else:
            return 99999


# departure_locations is a dict where the key is a airport code and a value is the number of people flying out of that airport 
# meeting_options is a list of the possible meeting cities as specified by the user
def create_graph(departure_locations, meeting_options, departure_date):
    G = nx.DiGraph()
    node_set = set()
    edge_set = set()

    total_demand = 0

    # get all of the top three flights from every combination of source and destination
    home_airports = departure_locations.keys()
    sd_pairs = get_source_dest_pairs(home_airports, meeting_options)

    # make first sentinel node
    total_people = 0
    for airport in home_airports:
        total_people += departure_locations[airport]

    source_node = 'SOURCE'
    G.add_node(source_node, demand=total_people)
    node_set.add(source_node)
    total_demand += total_people

    # make last sentinel node
    dest_node = 'DEST'
    G.add_node(dest_node, demand=(-1*total_people))
    node_set.add(dest_node)
    total_demand += (-1*total_people)

    for pair in sd_pairs:
        try:
            source = pair[0]
            dest = pair[1]
            response = amadeus.shopping.flight_offers.get(origin=source, destination=dest, departureDate=departure_date, max=5)
            time.sleep(1)

            offer_items = response.data
           
            for offer_item in offer_items:
                segments = offer_item['offerItems'][0]['services'][0]['segments']

                # for the first flight segment, we need to initialize the sentinel nodes (start airports without flights)
                first_segment = segments[0]['flightSegment']

                airport_tag = first_segment['departure']['iataCode']
                if airport_tag not in node_set:
                    G.add_node(airport_tag) 
                    node_set.add(airport_tag)
                    total_demand += int(departure_locations[airport_tag])

                full_flight_no = first_segment['carrierCode'] + first_segment['number']

                departure = first_segment['departure']
                departure_tag = create_node_tag(departure['iataCode'], 'D', full_flight_no)
                if departure_tag not in node_set:
                    G.add_node(departure_tag)
                    node_set.add(departure_tag)

                edge_tag = create_edge_tag(airport_tag, departure_tag)
                if edge_tag not in edge_set:
                    G.add_edge(airport_tag, departure_tag, capacity=int(departure_locations[airport_tag]))
                    print("Adding a flight from  ",airport_tag, " to ", departure_tag)

                    edge_set.add(edge_tag)

                # need to add an edge with the source and dest
                edge_tag = create_edge_tag('SOURCE', airport_tag)
                if edge_tag not in edge_set:
                    G.add_edge('SOURCE', airport_tag, weight=0)
                    print("Adding a flight from SOURCE to ", airport_tag)
                    edge_set.add(edge_tag)

               
                # for the last flight segment, we need to initialize the sentinel nodes (airport codes of conference destinations without flights)

                last_segment = segments[-1]['flightSegment']

                full_flight_no = last_segment['carrierCode'] + last_segment['number']

                arrival = last_segment['arrival']
                arrival_tag = create_node_tag(arrival['iataCode'], 'A', full_flight_no)
                if arrival_tag not in node_set:
                    G.add_node(arrival_tag)
                    node_set.add(arrival_tag)

                airport_tag = last_segment['arrival']['iataCode']
                if airport_tag not in node_set:
                    G.add_node(airport_tag)
                    node_set.add(airport_tag)

                edge_tag = create_edge_tag(arrival_tag, airport_tag)
                if edge_tag not in edge_set:
                    G.add_edge(arrival_tag, airport_tag, capacity = total_people)
                    print("Adding flight from ",arrival_tag, " to ", airport_tag)

                    edge_set.add(edge_tag)

                # add edge with dest
                edge_tag = create_edge_tag(airport_tag, 'DEST')
                if edge_tag not in edge_set:
                    G.add_edge(airport_tag, 'DEST', weight=0, capacity = total_people)
                    print("Adding flight from ",airport_tag, " to DEST")
                    edge_set.add(edge_tag)


                # flight segment is the leg of a flight
                for flight_segment_big in segments:
                    # create a node  for the airport itself
                    flight_segment = flight_segment_big['flightSegment']
                    departure = flight_segment['departure']
                    airport_tag = departure['iataCode']
                    if airport_tag not in node_set:
                        G.add_node(airport_tag)
                        node_set.add(airport_tag)

                    #create an edge from the airport the the departure
                    flight_segment = flight_segment_big['flightSegment']
                    full_flight_no = flight_segment['carrierCode'] + flight_segment['number']
                    departure_tag = create_node_tag(departure['iataCode'], 'D', full_flight_no)
                    
                    edge_tag = create_edge_tag(airport_tag, departure_tag)
                    if edge_tag not in edge_set:
                        G.add_edge(airport_tag, departure_tag)
                        print("adding flight from ", airport_tag, " to ", departure_tag)
                        edge_set.add(edge_tag)

                    # create a node for the flight departure and arrival
                    flight_segment = flight_segment_big['flightSegment']
                    full_flight_no = flight_segment['carrierCode'] + flight_segment['number']

                    departure = flight_segment['departure']
                    departure_tag = create_node_tag(departure['iataCode'], 'D', full_flight_no)
                    if departure_tag not in node_set:
                        G.add_node(departure_tag)
                        node_set.add(departure_tag)

                    arrival = flight_segment['arrival']
                    arrival_tag = create_node_tag(arrival['iataCode'], 'A', full_flight_no)
                    if arrival_tag not in node_set:
                        G.add_node(arrival_tag)
                        node_set.add(arrival_tag)

                    # create an edge for the flight itself
                    carrier_code = flight_segment['carrierCode']
                    flight_no = flight_segment['number']

                    '''
                    THIS PORTION BELOW IS INCORRECT
                    print(len(flight_segment_big[0]))
                    if (len(flight_segment_big[0]) == 2):
                        price = int(float(offer_item['offerItems'][0]['pricePerAdult']['total']) + float(offer_item['offerItems'][0]['pricePerAdult']['totalTaxes']))
                    else:
                        price = get_leg_price(departure['iataCode'], arrival['iataCode'], departure_date, carrier_code, flight_no)
                    '''
                    
                    price = int(float(offer_item['offerItems'][0]['pricePerAdult']['total']) + float(offer_item['offerItems'][0]['pricePerAdult']['totalTaxes']))

                    edge_tag = create_edge_tag(departure_tag, arrival_tag)
                    if edge_tag not in edge_set:
                        my_capacity = flight_segment_big['pricingDetailPerAdult']['availability']
                        G.add_edge(departure_tag, arrival_tag, weight = price, capacity = my_capacity)
                        print("adding flight from ", departure_tag, " to ", arrival_tag, " with weight ", price)
                        edge_set.add(edge_tag)

                    # create a node for the airport itself
                    airport_tag = arrival['iataCode']
                    if airport_tag not in node_set:
                        G.add_node(airport_tag)
                        node_set.add(airport_tag)

                    #create an edge from the arrival to the airport
                    edge_tag = create_edge_tag(arrival_tag, airport_tag)
                    if edge_tag not in edge_set:
                        G.add_edge(arrival_tag, airport_tag)
                        print("adding edge from ", arrival_tag, " to ", airport_tag)
                        edge_set.add(edge_tag)

        except ResponseError as error:
            print(error)

    return G

def main(departure_locations, meeting_options, departure_date):
    G = nx.DiGraph()
    G = create_graph(departure_locations, meeting_options, departure_date)
    flow_dict = nx.max_flow_min_cost(G, 'SOURCE', 'DEST')

    print(flow_dict)
    mincost = nx.cost_of_flow(G, flow_dict)
    print(mincost)

    pairs = []

    for u in flow_dict.keys():
        for v in (flow_dict[u]).keys():
            if int(flow_dict[u][v]) > 0:
                print(u, v, flow_dict[u][v])
                pairs.append((u,v))

    max_people = 0
    best_loc = ''
    for pair in pairs:
        if pair[1] == 'DEST':
            if int(flow_dict[pair[0]][pair[1]]) > max_people:
                best_loc = pair[0]
                max_people = int(flow_dict[pair[0]][pair[1]])

    print('Best location is ',best_loc)

    return best_loc, mincost

#this right here shows the format of the input you should put in
'''
def dummy():
    departure_locations = {}
    departure_locations['ORD'] = 5
    departure_locations['MIA'] = 3

    meeting_options = []
    meeting_options.append('SEA')
    meeting_options.append('SFO')

    departure_date = '2019-08-01'
    
    main(departure_locations, meeting_options, departure_date)

dummy()
'''
