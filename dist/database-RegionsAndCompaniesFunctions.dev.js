"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var _require2 = require('./database-models'),
    Region = _require2.Region,
    Country = _require2.Country,
    City = _require2.City,
    Company = _require2.Company,
    User = _require2.User,
    Contact = _require2.Contact,
    ChannelSocialMedia = _require2.ChannelSocialMedia,
    Preferency = _require2.Preferency;

function getAllRegisters(model) {
  var regionsData, countriesData, citiesData, companiesTable, usersTable, contactsTable;
  return regeneratorRuntime.async(function getAllRegisters$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = model;
          _context.next = _context.t0 === 'Region' ? 3 : _context.t0 === 'Company' ? 14 : _context.t0 === 'User' ? 20 : _context.t0 === 'Contact' ? 25 : 29;
          break;

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(Region.findAll({}));

        case 5:
          regionsData = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(Country.findAll({}));

        case 8:
          countriesData = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(City.findAll({}));

        case 11:
          citiesData = _context.sent;
          return _context.abrupt("return", [regionsData, countriesData, citiesData]);

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(Company.findAll({
            attributes: ['id', 'name', 'address', 'email', 'telephone', 'cityId'],
            foreignKey: 'city',
            include: {
              all: true,
              nested: true,
              required: true
            }
          }));

        case 16:
          companiesTable = _context.sent;
          // const allCompanies = JSON.stringify(companiesTable)
          console.log(companiesTable);
          return _context.abrupt("return", companiesTable);

        case 20:
          _context.next = 22;
          return regeneratorRuntime.awrap(User.findAll());

        case 22:
          usersTable = _context.sent;
          return _context.abrupt("return", usersTable);

        case 25:
          _context.next = 27;
          return regeneratorRuntime.awrap(Contact.findAll({
            attributes: ['name'],
            foreignKey: 'RegionId',
            include: {
              // model: Country,
              all: true,
              nested: true,
              required: true // include:{model: City, required: true}

            }
          }));

        case 27:
          contactsTable = _context.sent;
          return _context.abrupt("return", locationsTable);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  });
}

function updateRegister(model, register) {
  var set, setProperties, obj, companyUpdated;
  return regeneratorRuntime.async(function updateRegister$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          set = Object.keys(register).filter(function (key) {
            return register[key] != null && key != "id";
          }).map(function (key) {
            return "".concat(key, " : ").concat(JSON.stringify(register[key]));
          }).join(",");
          console.log(set);
          setProperties = set.split(',');
          obj = {};
          setProperties.forEach(function (setProperties) {
            var setValues = setProperties.split(':');
            obj[setValues[0]] = setValues[1];
          }); // switch(model, set, register) {
          //     case 'Company': 

          _context2.next = 7;
          return regeneratorRuntime.awrap(Company.update({
            set: set
          }, {
            where: {
              id: +register.id
            }
          }));

        case 7:
          companyUpdated = _context2.sent;
          console.log(companyUpdated);
          return _context2.abrupt("return", companyUpdated);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteRegister(model, id) {
  var companyToDelete, citiesdependentOnCountryToDelete, countryToDelete, cityToDelete, userToDelete;
  return regeneratorRuntime.async(function deleteRegister$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = model;
          _context3.next = _context3.t0 === 'Company' ? 3 : _context3.t0 === 'Region' ? 7 : _context3.t0 === 'Country' ? 8 : _context3.t0 === 'City' ? 15 : _context3.t0 === 'User' ? 19 : 23;
          break;

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(Company.destroy({
            where: {
              id: id
            }
          }));

        case 5:
          companyToDelete = _context3.sent;
          return _context3.abrupt("break", 23);

        case 7:
          return _context3.abrupt("break", 23);

        case 8:
          _context3.next = 10;
          return regeneratorRuntime.awrap(City.destroy({
            where: {
              CountryId: id
            }
          }));

        case 10:
          citiesdependentOnCountryToDelete = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(Country.destroy({
            where: {
              id: id
            }
          }));

        case 13:
          countryToDelete = _context3.sent;
          return _context3.abrupt("break", 23);

        case 15:
          _context3.next = 17;
          return regeneratorRuntime.awrap(City.destroy({
            where: {
              id: id
            }
          }));

        case 17:
          cityToDelete = _context3.sent;
          return _context3.abrupt("break", 23);

        case 19:
          _context3.next = 21;
          return regeneratorRuntime.awrap(User.destroy({
            where: {
              id: id
            }
          }));

        case 21:
          userToDelete = _context3.sent;
          return _context3.abrupt("break", 23);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function addNewLocation(model, name, id) {
  var newRegion, newCountry, newCity, newCompany;
  return regeneratorRuntime.async(function addNewLocation$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = model;
          _context4.next = _context4.t0 === 'Region' ? 3 : _context4.t0 === 'Country' ? 8 : _context4.t0 === 'City' ? 13 : _context4.t0 === 'Company' ? 18 : 23;
          break;

        case 3:
          _context4.next = 5;
          return regeneratorRuntime.awrap(Region.create({
            name: name
          }));

        case 5:
          newRegion = _context4.sent;
          console.log(newRegion);
          return _context4.abrupt("break", 23);

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(Country.create({
            name: name,
            RegionId: id
          }));

        case 10:
          newCountry = _context4.sent;
          console.log(newCountry);
          return _context4.abrupt("break", 23);

        case 13:
          _context4.next = 15;
          return regeneratorRuntime.awrap(City.create({
            name: name,
            CountryId: id
          }));

        case 15:
          newCity = _context4.sent;
          console.log(newCity);
          return _context4.abrupt("break", 23);

        case 18:
          _context4.next = 20;
          return regeneratorRuntime.awrap(Company.create({
            name: name.name,
            cityId: name.cityId,
            address: name.address,
            email: name.email,
            telephone: name.telephone
          }));

        case 20:
          newCompany = _context4.sent;
          console.log(newCompany);
          return _context4.abrupt("break", 23);

        case 23:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  getAllRegisters: getAllRegisters,
  addNewLocation: addNewLocation,
  updateRegister: updateRegister,
  deleteRegister: deleteRegister
};