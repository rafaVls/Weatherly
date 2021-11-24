class Param:
    """
    A query parameter type with `name`, `value` and `type` properties.

    :param name: The name of the parameter e.g. latitude.
    :param value: The value of the parameter, dependent on `type` e.g. 32.5.
    :param type: The type of the query parameter e.g. float.
    """
    def __init__(self, name: str, value, type: str) -> None:
        self.name = name
        self.value = value
        self.type = type

    def validate_type(self) -> None:
        """
        Validate the query parameter type. Raise TypeError if the parameter is 
        of the wrong type. 

        >>> p = Param("my_parameter", 12, "str")
        >>> p.validate_type()
        TypeError: my_parameter must be of type str
        """
        if self.value is None:
            raise TypeError(f"{self.name} must be of type {self.type}")

