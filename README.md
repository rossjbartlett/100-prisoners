# 100 Prisoners Problem Simulation

This is a simulation of the "100 Prisoners Problem", a popular riddle involving probability theory and combinatorics.

Via [Wikipedia](https://en.wikipedia.org/wiki/100_prisoners_problem):

> 100 numbered prisoners must find their own numbers in one of 100 drawers in order to survive. The rules state that each prisoner may open only 50 drawers and cannot communicate with other prisoners.

> If every prisoner selects 50 drawers at random, the probability that a single prisoner finds their number is 50%. Therefore, the probability that all prisoners find their numbers is ($\frac{1}{2}$)<sup>100</sup> ≈ 0.0000000000000000000000000000008, a vanishingly small number. The situation appears hopeless.

However, this application illustrates a surprising strategy that provides a survival probability of over 30%.

Each prisoner first opens the drawer labeled with their own number.
If that drawer does not contain their number, they then open the drawer labelled with the number that it one contained, and repeat this process until they find their number or fail.

This problem, and the strategy, have been featured in multiple [Youtube videos](https://youtu.be/iSNsgj1OCLA?t=35), [blogs](https://datagenetics.com/blog/december42014/index.html), and [whitepapers](https://math.mit.edu/~apost/courses/18.204_2018/Timothee_Schoen_paper.pdf).

## Running the App

The webapp can be run locally using `npm`.

```
npm install
npm start
```

Navigate to the webapp at [http://localhost:3000](http://localhost:3000).
