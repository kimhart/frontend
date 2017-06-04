import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class AboutMetrics extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="about-metrics-wrap">
        <h2 className="page-title">About Our Metrics</h2>
        <h3 className="secondary-headline">Curious about how we calculate grades and beliefs? You're in the right place. Check out each section below to learn more about our math and data science.</h3>
        <section className="about-metrics beliefs">
          <h4>Beliefs</h4>

          <h5>Short & Sweet:</h5>
          <p>Indicates a representative’s political ideology based on past legislative actions</p>

          <h5>Expanded:</h5>
          <p>“Beliefs” indicate representatives’ political ideologies—where they fall on the liberal-to- conservative spectrum—based on their legislative actions. Actions are broken up into two categories: bills they’ve voted on, and bills they’ve sponsored (written) or co-sponsored (committed to supporting when it comes time to vote).
          <br/><br/>
          These positions only reflect representatives’ histories with partisan bills—nonpartisan bills were not considered. A partisan bill is one for which the majority of representatives classified as liberals voted the opposite of representatives classified as conservatives.</p>

          <h5>Deep-Dive:</h5>
          <p>Beliefs are split up into general categories (like “Social”), which are in turn made up of specific categories (like “Obamacare” and “Women and Minority Rights”). The specific categories are averaged to determine where representatives fall on the more general category’s liberal-to- conservative scale.
          These general categories are all averaged to get representatives’ “Overall” belief scores.
          <br/>
          To determine representatives’ beliefs in specific categories, we looked at voting patterns of partisan bills only. A partisan bill is one for which the majority of representatives classified as liberals voted the opposite of representatives classified as conservatives, where a minimum of 10 liberals and 10 conservatives voted on the bill. The number of liberal and conservative votes for the bill determined the probability of a representative who voted on that bill being liberal or conservative.
          <br/><br/>
          For example, say 48 liberals voted “yes” on bill 101, and 2 liberals voted “no.” That meant 96% of liberals voted “yes,” and 4% voted “no.” Meanwhile, 2 conservatives voted “yes,” and 23 voted “no,” so 8% voted “yes” and 92% voted “no.” If Senator X voted “yes” on bill 101, we considered her to be 96% liberal and 8% conservative, since that is the percentage of liberals and conservatives who shared that vote. Likewise, if Senator Y voted “no,” we considered him to be 4% liberal and 92% conservative.
          <br/><br/>
          We did this for every partisan bill representatives voted on in each specific ideological category, ultimately adding the probability of being liberal and of being conservative for each representative. We subtracted the sum of the liberal percentages from the sum of the conservative percentages, so representatives left with lower negative numbers were considered more liberal leaning. Those left with higher positive numbers were considered more conservative. These numbers represent what we call representatives’ “ideology scores.”
          <br/><br/>
          But wait, there’s more! Sponsoring and co-sponsoring bills reveal an added level of a representative’s commitment to an ideology. We factored this in by taking the average ideology score for all the representatives who co-sponsored a specific partisan bill on a scale from -3 to 3. We used this number to determine whether a bill was “liberal sponsored” or “conservative sponsored” on a scale from -1 (most liberal) to 1 (most conservative). This number represents what we call each representative’s “sponsor/co-sponsor probability.” We added this number to each representative’s total ideology score.
          <br/><br/>
          Finally, we transformed these scores so that their midpoint fit to the representative(s) most neutral on that particular topic. The most neutral representative would be the one whose total ideology score is closest to zero and who has voted on a lot of bills, as we ultimately divide the ideology score by the number of bills the representative has voted on. For instance, if Senator A has an ideology score of .8 and has voted on 20 bills, their score becomes .04. Meanwhile, Senator B, who has an ideology score of .5 but only voted on 2 bills gets a score of .25, making Senator A more neutral than Senator B.
          <br/><br/>
          To ensure the most neutral representative represents the midpoint, we made that number the mean (so .04 would be the mean in the above example). Then we gave all representatives a z-score, which is the representative’s total ideology score subtracted by the newly established mean and then divided by the standard deviation of the range. Once the z-scores were all calculated, we wanted to make the range between -3 and 3. We did this by scaling the range of z-scores to -1 and 1, and then stretching it back out to -3 to 3. The result is the score that determines where representatives lie on each liberal-to- conservative belief spectrum you see in Tally.</p>
        </section>
        <section className="about-metrics grades">
          <h4>Grades</h4>

          <h5>Short & Sweet:</h5>
          <p>Indicates how active a representative is in Congress.</p>

          <h5>Expanded:</h5>
          <p>Why should you care about “grades”? You may agree with your representatives’ beliefs, but if they are not showing up to work or voting on bills, they are not actively representing you. Grades take into account representatives’ attendance and participation in Congress, as well as how many bills they’ve sponsored and how many committees they’re on. Representatives receive “extra credit” for having sponsored bills that become law and for being in congressional and/or committee leadership positions. The Speaker of the House is excluded from these letter grades.</p>

          <h5>Deep-Dive:</h5>
          <p>Grades indicate how active representatives are in congress, so they take into account attendance, participation (aka, how many bills they’ve voted on), how many bills they’ve sponsored, and how many committees they are on. We boosted representatives’ grades if they’ve gone the extra mile by being in congressional and/or committee leadership positions and if they’ve sponsored bills that went on to become law.
          <br/><br/>
          The attendance and participation scores are simple. To calculate attendance, we divided representatives’ total days at work by the maximum days they could have been at work. For participation, we divided the total numbers of bills they’ve voted on by the total number of bills that went before Congress during their tenure.
          <br/><br/>
          For sponsor scores, we ranked representatives by how many bills they’ve sponsored, separately for the Senate and for the House of Representatives. If, say, Senator X sponsored the most bills at 57, she was ranked number 1. Senator Y, who sponsored the second most bills at 50, was ranked 2, and so on, etc. Each ranking got a corresponding percentile: 100% for rank 1, 99% for rank 2, etc. We divided each of these percentiles in half to reduce the weight of the sponsor scores as they factored into the overall grades.
          <br/><br/>
          Committee scores were determined the same way as sponsor scores, again considering the Senate and the House of Representatives separately. However, only data from the current congressional year was available for this score. Grades for previous congressional years exclude committee scores.
          <br/><br/>
          To determine representatives’ grades, we added the above 4 scores (attendance, participation, sponsor, and committee) and divided by 3. When determining grades for previous congressional years without the committee score, we added the other 3 available scores and divided by 2.5.
          <br/><br/>
          This is where the extra credit comes in. If representatives sponsored bills that became law, they received “extra credit” proportional to the number of those bills that became law. Congressional leadership positions and committee leadership positions also garnered extra credit. Attendance and participation were weighted higher to ensure that representatives who at least show up to work and vote on bills get a C grade.
          <br/><br/>
          Each letter grade maps to a percentile between 0 and 100. Representatives with over 100% were bumped down to 100% and received an “A+” grade. The remaining percentiles mapped to letter grades as follows:</p>
        </section>
      </div>
    );
  }
}

export default AboutMetrics;
