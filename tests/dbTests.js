var db = require('../models');

db.preference.create({
  userId: 1,
  coinId: 2,
  watchlist: 3,
  value: 4
}).then(function(preference) {
  // console.log(preference.get());
});

db.user.find({
  where: { id: 1 },
  include: [db.preference]
}).then(function(user) {
  // by using eager loading, the project model should have a categories key
  console.log(user.categories);

  // a createCategory function should be available to this model
  // project.createCategory({ name: 'node' }).then(function(category) {
  //   console.log(category.get());
  // });
});