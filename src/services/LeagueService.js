/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 *       ADDITIONALLY, MAKE SURE THAT ALL LIBRARIES USED IN THIS FILE FILE ARE COMPATIBLE WITH PURE JAVASCRIPT
 * 
 */
import http from "../api/request";
class LeagueService {

    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */
    constructor() {
        this.matches = []
    }
    setMatches(matches) {
        this.matches = matches
    }
    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    async getMatches() {
        await this.fetchData()
        return this.matches
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of countrys representing the leaderboard.
     */
    async getLeaderboard() {
        await this.fetchData()
        const countrys ={};
        this.matches.forEach(match => {
            const { matchDate, stadium, homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchPlayed } = match;
            if (matchPlayed) {
                if (!countrys[homeTeam]) {
                    countrys[homeTeam] = { teamName: homeTeam, matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
                }
                if (!countrys[awayTeam]) {
                    countrys[awayTeam] = { teamName: awayTeam, matchesPlayed: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
                }
                countrys[homeTeam].matchesPlayed += 1;
                countrys[awayTeam].matchesPlayed += 1;
                countrys[homeTeam].goalsFor +=homeTeamScore;
                countrys[awayTeam].goalsFor +=awayTeamScore;
                countrys[homeTeam].goalsAgainst += awayTeamScore;
                countrys[awayTeam].goalsAgainst += homeTeamScore;
                if (homeTeamScore > awayTeamScore) {
                    countrys[homeTeam].points += 3;
                } else if (homeTeamScore < awayTeamScore) {
                    countrys[awayTeam].points += 3;
                } else {//平局
                    countrys[homeTeam].points += 1;
                    countrys[awayTeam].points += 1;
                }
            }
        });
        const countrysArray = Object.values(countrys);
        countrysArray.sort((a, b) => {
                if (b.points !== a.points) {
                    return b.points - a.points;
                }
                const goalDifferenceA = a.goalsFor - a.goalsAgainst;
                const goalDifferenceB = b.goalsFor - b.goalsAgainst;
                if (goalDifferenceB !== goalDifferenceA) {
                    return goalDifferenceB - goalDifferenceA;
                }
                if (b.goalsFor !== a.goalsFor) {
                    return b.goalsFor - a.goalsFor;
                }
                return a.teamName.localeCompare(b.teamName);
            });
            console.log(countrys);
        return countrysArray
    }

    /**
     * Asynchronic function to fetch the data from the server and set the matches.
     */
    async fetchData() {
        const res = await http('/api/v1/getAllMatches');
        const matches = res.data.matches
        this.setMatches(matches);
        // return matches; 
    }
}

export default LeagueService;