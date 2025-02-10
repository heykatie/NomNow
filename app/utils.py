import re


def camel_to_snake(name):
    """Convert a single camelCase string to snake_case."""
    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()


def convert_camel_to_snake(data):
    """Recursively convert all camelCase keys in a dictionary to snake_case."""
    if isinstance(data, list):
        return [
            convert_camel_to_snake(item) if isinstance(item, dict) else item
            for item in data
        ]
    elif isinstance(data, dict):
        return {camel_to_snake(k): convert_camel_to_snake(v) for k, v in data.items()}
    else:
        return data
