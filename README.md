<h1> Entrilo </h1>

It's 2019... do we even need business meetings in person anymore? According to the Event Marketing 2018: Benchmarks and Trends report, the majority (84%) of leadership—Vice President and C-Suite—believe in-person events are a critical component of their company’s success (Bizzabo). Not only that, but their budgets are where their mouths are: 62% of senior marketers plan on investing more in live events in the future both in budget and number of events. (Bizzabo, 2018)

For internal company events, the travel, hotel, and venue cost is on the company's dime. Based on conversations with employees at HackIllinois, we found that this expensive is far from optimized - locations for internal company events are chosen by a group of 5-15 people. We saw an opportunity here.

<h3> <i> We thought we could save companies money by choosing the optimal location for a company event. </i></h3>

In addition, we thought that we could make this tool all-purpose. If the optimal location happened to be in a major city without a company office, we decided we could provide conference room suggestions and price. In addition, we could provide costs for hotels and for transportation to and from airports, hotels, and the venue.

<h2> Travel management software pain points </h2>

Employees often choose their own travel and hotel, costing a company extra money

Employees have to book their own travel if higher up, wasting their time

<h3>How we addressed (or would address) those pain points:</h3>

If our product were fully functional, employees could have an account on Entrilo and input flight preferences. Their flight and hotel would be chosen and booked for them based off the optimal algorithm as well as their preferences, saving money for the company.

In addition, they would no longer have to book their own flights, saving them time booking and filling out expense reports. When asked, most HackIllinois attendees in the workforce would not mind having their flights and hotels booked for them if their preferences were taken into consideration. For example: only fly American Airlines, prefer to fly mornings, prefer least travel time, have travel rewards number (can be inputted).

<h2> Business case </h2>
Is this *really* saving enough money to be worth using? To find this out, we gathered information on a few companies that HackIllinois workplace attendees worked for or had worked for in the past.

**Company A**: ~100,000 employees, ~100 people per team ~1000 teams spread across different office locations, 1-2 team summits per team per year

1.5 team summits * 1000 teams * 100 people getting moved * AMOUNT_SAVED_PER_PERSON = 150,000 * AMOUNT_SAVED_PER_PERSON

Let's say we can save ~$50/person.

150,000 * 50 = $7,500,000 in savings/year.

Realistically, Company A is doing well enough financially that $7,500,000 is going to make or break them. Let's try another company

**Company B**:
~300 employees, ~10-20 people per team, ~20 teams, 1-2 team meetings per team per year

1.5 meetings * 20 teams * 15 people getting moved * AMOUNT_SAVED_PER_PERSON = 450 * AMOUNT_SAVED_PER_PERSON

Let's say we can save ~$50/person.

$450 * 50 = $225,000 in savings/year

So we can see that in a smaller company, this could be a non-negligible portion of the budget allowed for travel.

<h2>Open source use cases</h2>
This software would ideally be full-featured with expense management and other travel planning features that our competitors like SAP Concur, Egencia, or Certify to have a leg up on the competitors.

*However*, we noticed a potential use for our algorithms in many domains. Any instance of a group of people all on one budget needing to meet in a place could send in their parameters to our algorithms and find out their total cost as well as the optimal place to meet. For example: a NFL sports team reunion.

<h2>Understanding the algorithm</h2>
We use a min-cost max-flow problem to solve this problem. This problem finds the max units that can be moved from a source to a dest while getting the smallest cost as well as takes in capacity. Our concern with moving large amounts of people from place to place is that there is limited space on flights, so we knew any algorithm we could come up with would try to put everyone on the same, cheapest flight to a location even if that space is not available. We modeled this graph and sent it in to a library that black boxed this problem for us.

<img src = "http://i67.tinypic.com/29z1jif.jpg">

One mistake we made was thinking we could force all the flow through one airport destination (in this case, AUS or SFO). We realize that the algorithm does not work if the total flow is not 0, which made this impossible to put a -500 flow on each of these locations to get all the people to end up in the same place.

Realizing this too late, our algorithm is modified in a small way. We instead take the location that the most people are sent to as the optimal location as it is saving them the most money and would likely be overall optimal.

In the future, we would revamp our algorithm to be optimal.

<h2>Usage</h2>
<pre>npm install on both server and client</pre>
<pre>npm start on both server and client</pre>
<pre>Algorithm for free use in server/cost_optimizer.py</pre>

<h2>License</h2>
<pre>MIT License
  
Copyright (c) 2019 Michael Shea

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</pre>

<a href = "https://devpost.com/software/entrilo">HackIllinois Submission</a>
