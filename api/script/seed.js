const db = require('../server/db');
const { User, Trail } = require('../server/db/models');

const users = [
  {
    name: 'Hansel Gretel',
    email: 'hansel@hansel.com',
    password: 'hansel',
    isAdmin: false,
    userId: 1
  },
  {
    name: 'Panda Manda',
    email: 'panda@panda.com',
    password: 'panda',
    isAdmin: false,
    userId: 2
  },
  {
    name: 'a a',
    email: 'a@a.com',
    password: 'a',
    isAdmin: false,
    userId: 3
  },
  {
    name: 'Jesse Moskowitz',
    email: 'jesse@jesse.com',
    password: 'jesse',
    isAdmin: true,
    userId: 4
  },
  {
    name: 'Kevin Ho',
    email: 'kevin@kevin.com',
    password: 'kevin',
    isAdmin: true,
    userId: 5
  },
  {
    name: 'Shannen Ye',
    email: 'shannen@shannen.com',
    password: 'shannen',
    isAdmin: true,
    userId: 6
  },
  {
    name: 'Vanessa Jimenez',
    email: 'vanessa@vanessa.com',
    password: 'vanessa',
    isAdmin: true,
    userId: 7
  }
];

const trails = [
  {
    description: "Kevin's seat facing Omri",
    breadcrumbs :  [
         {
           "x": 0,
           "y": 0,
           "z": 0,
         },
         {
           "x": 0.00045998164637406217,
           "y": 0.05394339303353542,
           "z": -0.0464993622851026,
         },
         {
           "x": 1.5723265051949307,
           "y": 0.1546692372969397,
           "z": -0.3793032640736101,
         },
         {
           "x": 3.04024696345025,
           "y": 0.1652479707888437,
           "z": -1.578439183203696,
         },
         {
           "x": 3.523158424540035,
           "y": 0.1863570642250761,
           "z": -3.792648354035474,
         },
         {
           "x": 3.0610343754591587,
           "y": 0.1828051321523292,
           "z": -5.660594407252982,
         }
       ],
    userId: 5
  },
  {
    description: "Kevin's seat 3D trail test on x-y-z planes",
    breadcrumbs :  [
     {"x": 0, "y": 0, "z": 0},
     {"x": 0, "y": 0, "z": -0.5},
     {"x": 0, "y": 0, "z": -1},
     {"x": 0.5, "y": 0, "z": -1},
     {"x": 1, "y": 0, "z": -1},
     {"x": 1, "y": 0.5, "z": -1},
     {"x": 1, "y": 1, "z": -1}
    ],
    userId: 3
  }
];

const seed = () =>
Promise.all(users.map(user =>
  User.create(user))
)
.then(() =>
Promise.all(trails.map(trail =>
  Trail.create(trail))
)
);

const main = () => {
  console.log('Syncing db...');
  db.sync({force: true})
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
