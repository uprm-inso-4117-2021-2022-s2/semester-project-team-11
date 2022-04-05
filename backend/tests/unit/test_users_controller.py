import unittest
import sys
# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, '/controller/')
from controller.users import BaseUsers

'''
Command to run tests: python -m unittest tests/unit/test_users_controller.py
'''
class TestUserController(unittest.TestCase):
    def test_users_controller_login_map(self):
        expected = {
            'userid' : '1',
            'firstname': 'Bob',
            'lastname': 'Strat'
        }
        test_row = ('1', 'Bob', 'Strat')
        test_user = BaseUsers()
        self.assertAlmostEqual(expected, test_user.build_login_map_dict(test_row))

    def test_users_controller_newuser_map(self):
        expected = {
            'userid' : '1',
            'firstname': 'Bob',
            'lastname': 'Strat',
            'email': 'bob.strat@mail.com',
            'legalAge': 'True'
        }
        test_row = ('1', 'Bob', 'Strat', 'bob.strat@mail.com', 'True')
        test_user = BaseUsers()
        self.assertAlmostEqual(expected, test_user.build_newuser_map_dict(test_row))
