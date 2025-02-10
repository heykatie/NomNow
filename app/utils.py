import re


def camel_to_snake(name):
    """Convert a single camelCase string to snake_case."""
    return re.sub(r"(?<!^)(?=[A-Z])", "_", name).lower()


def convert_camel_to_snake(data):
    """Recursively convert all camelCase keys in a dictionary to snake_case."""
    if isinstance(data, list):
        print(
            [
                convert_camel_to_snake(item) if isinstance(item, dict) else item
                for item in data
            ]
        )
        return [
            convert_camel_to_snake(item) if isinstance(item, dict) else item
            for item in data
        ]
    elif isinstance(data, dict):
        print(
            "Incoming request data:",
            {camel_to_snake(k): convert_camel_to_snake(v) for k, v in data.items()},
        )  # Debugging line
        return {camel_to_snake(k): convert_camel_to_snake(v) for k, v in data.items()}
    else:
        print("Incoming request data:", data)  # Debugging line
        return data
