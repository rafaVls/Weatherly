from weatherly.Param import Param

import pytest

class TestParam:
    """All tests related to the Param class"""


    def test_init(self):
        param = Param("latitude", 32, "int")

        assert param.name == "latitude"
        assert param.type == "int"
        assert param.value == 32

    def test_validate_type(self):
        param = Param("longitude", None, "str")

        with pytest.raises(TypeError, match="longitude must be of type str"):
            param.validate_type()
