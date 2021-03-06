angular.module('fantasy_app')
  .constant('teams',
    [
      {
        "team_id": "ARI",
        "city": "Arizona",
        "name": "Cardinals"
      },
      {
        "team_id": "ATL",
        "city": "Atlanta",
        "name": "Falcons"
      },
      {
        "team_id": "BAL",
        "city": "Baltimore",
        "name": "Ravens"
      },
      {
        "team_id": "BUF",
        "city": "Buffalo",
        "name": "Bills"
      },
      {
        "team_id": "CAR",
        "city": "Carolina",
        "name": "Panthers"
      },
      {
        "team_id": "CHI",
        "city": "Chicago",
        "name": "Bears"
      },
      {
        "team_id": "CIN",
        "city": "Cincinatti",
        "name": "Bengals"
      },
      {
        "team_id": "CLE",
        "city": "Cleveland",
        "name": "Browns"
      },
      {
        "team_id": "DAL",
        "city": "Dallas",
        "name": "Cowboys"
      },
      {
        "team_id": "DEN",
        "city": "Denver",
        "name": "Broncos"
      },
      {
        "team_id": "DET",
        "city": "Detroit",
        "name": "Lions"
      },
      {
        "team_id": "GB",
        "city": "Green Bay",
        "name": "Packers"
      },
      {
        "team_id": "HOU",
        "city": "Houston",
        "name": "Texans"
      },
      {
        "team_id": "IND",
        "city": "Indianapolis",
        "name": "Colts"
      },
      {
        "team_id": "JAC",
        "city": "Jacksonville",
        "name": "Jaguars"
      },
      {
        "team_id": "KC",
        "city": "Kansas City",
        "name": "Chiefs"
      },
      {
        "team_id": "MIA",
        "city": "Miami",
        "name": "Dolphins"
      },
      {
        "team_id": "MIN",
        "city": "Minnesota",
        "name": "Vikings"
      },
      {
        "team_id": "NE",
        "city": "New England",
        "name": "Patriots"
      },
      {
        "team_id": "NO",
        "city": "New Orleans",
        "name": "Saints"
      },
      {
        "team_id": "NYG",
        "city": "New York",
        "name": "Giants"
      },
      {
        "team_id": "NYJ",
        "city": "New York",
        "name": "Jets"
      },
      {
        "team_id": "OAK",
        "city": "Oakland",
        "name": "Raiders"
      },
      {
        "team_id": "PHI",
        "city": "Philadelphia",
        "name": "Eagles"
      },
      {
        "team_id": "PIT",
        "city": "Pittsburgh",
        "name": "Steelers"
      },
      {
        "team_id": "SD",
        "city": "San Diego",
        "name": "Chargers"
      },
      {
        "team_id": "SEA",
        "city": "Seattle",
        "name": "Seahawks"
      },
      {
        "team_id": "SF",
        "city": "San Francisco",
        "name": "49ers"
      },
      {
        "team_id": "STL",
        "city": "St. Louis",
        "name": "Rams"
      },
      {
        "team_id": "TB",
        "city": "Tampa Bay",
        "name": "Buccaneers"
      },
      {
        "team_id": "TEN",
        "city": "Tennessee",
        "name": "Titans"
      },
      {
        "team_id": "WAS",
        "city": "Washington",
        "name": "Redskins"
      }
    ]
  )
  .constant('stats_names',
       {
        passing_yds : 'Passing Yards',
        passing_tds : 'Passing TDs',
        rushing_yds : 'Rushing Yards',
        rushing_tds : 'Rushing TDs',
        rushing_att : 'Rushing Attempts',
        receiving_yds : 'Receiving Yards',
        receiving_tds : 'Receiving TDs',
        receiving_rec : 'Receptions',
        receiving_tar : 'Receiving Targets',
        total_points: 'Total Points',
        ranked: 'Weekly rank among same position'
      }
  );
