
# Apparel-Inventory
 Apparel Inventory Replica. 

## Installation

Backend

```
 Clone the repo using Github CLI--> git clone https://github.com/AyRawat/Apparel-Inventory-Backend.git
 cd APPAREL_INVENTORY_BACKEND
 Install the dependencies--> npm i
 Run the Project --> npm start
```

    
## API Reference

#### Update Single Item in the Inventory

```http
  PUT /api/stock?apparelId=${apparelId}&size=${size}
 curl --location --request PUT 'http://localhost:3000/api/stock?apparelId=1111&size=S' \
--header 'Content-Type: application/json' \
--data '{
    "price":"435",
    "quantity":"201"
}'
```
Response
```
{
    "message": "Successfully Updated the record",
    "value": {
        "apparelId": "1111",
        "size": "S",
        "quantity": "201",
        "price": "435"
    }
}
```

|Query Parameter | Type     | Description                | 
| :-------- | :------- | :------------------------- |
| `apparelId` | `string` | **Required**. e.g "1111" |
| `size` |   `string`     | **Required**. e.g "S"  ->  can only have the values : (S,M,L)|

| Body Parameter | Type | Description |
| :------------- | :-----| :-----------|
| `price`        |   `string`| **Required**. e.g "435"|
| `quantity`        |   `string`| **Required**. e.g "200"|

}
#### Update Multiple Items in the Inventory

```http
  PUT api/stock/apparel

curl --location --request PUT 'http://localhost:3000/api/stock/apparel' \
--header 'Content-Type: application/json' \
--data '{"data":[ {
      "apparelId": 3333,
      "quantity": 36,
      "price": 115,
      "size": "M",
    },
    {
      "apparelId": 4444,
      "quantity": 75,
      "price": 987,
      "size": "M",
    }]}'
```
Response
```
Successfull:
{
    "message": "All the Items were successfully Updated",
    "failedTransactions": []
}

Failed:
{
    "message": "Not able to update the following items",
    "failedTransactions": [
        {
            "apparelId": 44447,
            "quantity": 75,
            "price": 987,
            "size": "M",
            "description": "Blazers",
            "collection": "Wedding 2022"
        }
    ]
}
```
Array Of:
| Body Parameter | Type | Description |
| :------------- | :-----| :-----------|
| `apparelId` | `string` | **Required**. e.g "1111" |
| `size` |   `string`     | **Required**. e.g "S"  ->  can only have the values : (S,M,L)|
| `price` |   `string`| **Required**. e.g "435"|
| `quantity`|   `string`| **Required**. e.g "200"|

}


#### Check if Order can be fulfilled or Not

```http
  PUT api/order/fulfill

curl --location 'http://localhost:3000/api/order/fulfill' \
--header 'Content-Type: application/json' \
--data '{"order":[ {
      "apparelId": 1111,
      "quantity": 3,
      "size": "M"
    },
    {
      "apparelId": 2222,
      "quantity": 10,
      "size": "L"
    }]}'
```
Response
```
{
    "canFulFill": true
}

```
Array Of
| Body Parameter | Type | Description |
| :------------- | :-----| :-----------|
| `apparelId` | `string` | **Required**. e.g "1111" |
| `size` |   `string`     | **Required**. e.g "S"  ->  can only have the values : (S,M,L)|
| `quantity`|   `string`| **Required**. e.g "200"|

}

#### Lowest Price in which the order can be fulfilled

```http
  PUT api/order/lowest-cost

curl --location 'http://localhost:3000/api/order/lowest-cost' \
--header 'Content-Type: application/json' \
--data '{"order":[ {
      "apparelId": 1111,
      "quantity": 3,
      "size": "M"
    },
    {
      "apparelId": 2222,
      "quantity": 10,
      "size": "L"
    }]}'
```
Response
```
Success:
{
    "lowestCost": 5242,
    "message": "Successfully Calculated the Minimum Price"
}

Failed:
{
    "message": "The Required Quantity is not available"
}
```
Array Of
| Body Parameter | Type | Description |
| :------------- | :-----| :-----------|
| `apparelId` | `string` | **Required**. e.g "1111" |
| `size` |   `string`     | **Required**. e.g "S"  ->  can only have the values : (S,M,L)|
| `quantity`|   `string`| **Required**. e.g "200"|

}