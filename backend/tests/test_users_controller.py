import unittest
import sys
# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, '/controller/')
from controller.users import BaseUsers

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
