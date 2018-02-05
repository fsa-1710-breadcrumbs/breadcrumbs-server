const db = require('../server/db');
const { User, Trail } = require('../server/db/models');

const users = [
  {
    name: 'Jesse Moskowitz',
    email: 'jesse@jesse.com',
    photoUrl: 'https://avatars2.githubusercontent.com/u/12431338?s=460&v=4',
    password: 'jesse',
    isAdmin: true,
    userId: 1
  },
  {
    name: 'Kevin Ho',
    email: 'kevin@kevin.com',
    photoUrl: 'https://avatars1.githubusercontent.com/u/15680221?s=460&v=4',
    password: 'kevin',
    isAdmin: true,
    userId: 2
  },
  {
    name: 'Shannen Ye',
    email: 'shannen@shannen.com',
    photoUrl: 'https://avatars1.githubusercontent.com/u/30578065?s=460&v=4',
    password: 'shannen',
    isAdmin: true,
    userId: 3
  },
  {
    name: 'Vanessa Jimenez',
    email: 'vanessa@vanessa.com',
    photoUrl: 'https://avatars2.githubusercontent.com/u/16891417?s=460&v=4',
    password: 'vanessa',
    isAdmin: true,
    userId: 4
  }
];

const trails = [
  {
    origin: "Jesse's seat FACING front of room",
    destination: "Omri/Corey at front of room",
    breadcrumbs:
      [{x: 0, y: 0, z: 0},{x: 0.04621989397406039, y: 0, z: -0.010111871759053575},{x: 1.2203935981890806, y: 0, z: -0.07376508220796368},{x: 1.9473323187916232, y: 0, z: -0.717306416182231},{x: 1.9980790806153121, y: 0, z: -1.8760019018542837},{x: 1.7912805223938928, y: 0, z: -3.191925800491439},{x: 1.589544153129184, y: 0, z: -4.398653694017711},{x: 1.395891428065262, y: 0, z: -5.579905151348579},{x: 1.1780804591740024, y: 0, z: -6.536086028727952},{x: 1.3483641339137995, y: 0, z: -7.438910072794615},{x: 1.388519145953815, y: 0, z: -7.930172684129646}],
    userId: 1
  },
  {
    origin: "Kevin's seat FACING front of room",
    destination: "The Oasis",
    breadcrumbs:
      [{x: 0, y: 0, z: 0},{x: -0.0012787279615157107, y: 0, z: -0.02046597092274812},{x: 0.35826480462721594, y: 0, z: -0.4995887997882006},{x: 1.2402289479678108, y: 0, z: -0.4129984043851947},{x: 2.2599878033027636, y: 0, z: -0.5068927876029659},{x: 2.7821030086219323, y: 0, z: -1.2376510963534373},{x: 2.871863040812895, y: 0, z: -2.2982038616594322},{x: 2.834618956492963, y: 0, z: -3.4650766534665407},{x: 2.7708882313458694, y: 0, z: -4.724713238320906},{x: 3.4547885186581824, y: 0, z: -5.364730951296693},{x: 4.931144478421292, y: 0, z: -5.320624934295344},{x: 6.346925333288327, y: 0, z: -5.938274584812081},{x: 6.5651466724155325, y: 0, z: -7.339299453737622},{x: 6.603830583072056, y: 0, z: -8.790152958236208},{x: 6.489099055120257, y: 0, z: -9.6642433563615}],
    userId: 2
  },
  {
    origin: "Side lunch table FACING back of room",
    destination: "Air conditioner facing back of room",
    breadcrumbs:
      [{x: 0, y: 0, z: 0},{x: -0.005013823861179735, y: 0, z: -0.04511296468055063},{x: 0.04048255341587897, y: 0, z: -1.4781650987572768},{x: 0.0446758622730338, y: 0, z: -2.8822074601896794},{x: -0.3484867745938543, y: 0, z: -3.8812053365866457},{x: -1.599071713362875, y: 0, z: -4.040955921891487},{x: -2.6887273971722663, y: 0, z: -3.8086779200980483},{x: -3.9602797928569973, y: 0, z: -3.9125216512715437},{x: -5.293961618511026, y: 0, z: -3.914138816236763},{x: -6.490486876500239, y: 0, z: -3.888171590985746},{x: -6.7800717055929125, y: 0, z: -3.9889117485439294},{x: -6.789749265757181, y: 0, z: -3.982942322108759},{x: -6.340085973920561, y: 0, z: -3.9710013963204323}],
    userId: 3
  },
  {
    origin: "Vanessa's seat FACING front of room",
    destination: "Small side kitchen",
    breadcrumbs:
      [{x: 0, y: 0, z: 0},{x: -0.11089113262932988, y: 0, z: -0.1427332268172404},{x: -0.9831594906970051, y: 0, z: -0.3617813420353831},{x: -2.275177640839609, y: 0, z: -0.3250814247855739},{x: -2.655521444235041, y: 0, z: -1.3904662709031521},{x: -2.7430768089074693, y: 0, z: -2.9926489887586416},{x: -2.7570641634272524, y: 0, z: -4.792924617453357},{x: -2.9654943613420235, y: 0, z: -6.37468207504353},{x: -3.277973142008969, y: 0, z: -7.918609507806708},{x: -3.38823477078499, y: 0, z: -9.538172321662286},{x: -3.398307870975089, y: 0, z: -11.28020526380665},{x: -3.349391289960748, y: 0, z: -12.800659259618536},{x: -3.5610961942759602, y: 0, z: -14.361094272015547},{x: -3.6246882220139036, y: 0, z: -16.048010424846698},{x: -2.5083019380227354, y: 0, z: -16.586222586028516},{x: -1.6895007915529063, y: 0, z: -16.745301534033214}],
    userId: 4
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
