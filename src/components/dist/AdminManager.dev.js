"use strict";

var _firebaseConfig = require("../firebaseConfig");

var _firestore = require("firebase/firestore");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Fetch Admins from Firestore
useEffect(function () {
  var fetchAdmins = function fetchAdmins() {
    var querySnapshot, adminsData;
    return regeneratorRuntime.async(function fetchAdmins$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap((0, _firestore.getDocs)((0, _firestore.collection)(_firebaseConfig.db, 'admins')));

          case 2:
            querySnapshot = _context.sent;
            adminsData = querySnapshot.docs.map(function (doc) {
              return _objectSpread({
                id: doc.id
              }, doc.data());
            });
            setAdmins(adminsData);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  fetchAdmins();
}, []); // Add new admin to Firestore

var handleAddAdmin = function handleAddAdmin(e) {
  return regeneratorRuntime.async(function handleAddAdmin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          e.preventDefault();

          if (!(newAdminEmail.trim() === '')) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return");

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _firestore.addDoc)((0, _firestore.collection)(_firebaseConfig.db, 'admins'), {
            email: newAdminEmail
          }));

        case 6:
          setAdmins([].concat(_toConsumableArray(admins), [{
            email: newAdminEmail
          }]));
          setNewAdminEmail(''); // Clear input field

          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          console.error('Error adding admin:', _context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
}; // Delete an admin


var handleDeleteAdmin = function handleDeleteAdmin(id) {
  return regeneratorRuntime.async(function handleDeleteAdmin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _firestore.deleteDoc)((0, _firestore.doc)(_firebaseConfig.db, 'admins', id)));

        case 3:
          setAdmins(admins.filter(function (admin) {
            return admin.id !== id;
          }));
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error('Error deleting admin:', _context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
};