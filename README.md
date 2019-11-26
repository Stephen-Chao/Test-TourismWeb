# Assignment 1 - Agile Software Practice.
Name:PengyuZhao 
## Overview.
*This test uses the api method to test, but the program uses the mongo online database method to test, hope to understand.*
 
## API endpoints.
### tourismsTest

 1. Test all attractions (GET /tourism)
 2. Test the sights by id (GET /tourism/:id)
    1. Enter a valid id 
    2. Enter invalid id 
 3. Test the attraction delete by id (DELETE /tourism/)
    1. Enter a valid id 
        1. Verify that the data exists 
    2. Enter invalid id 
 4. Test the added attractions and their properties (POST /tourism/)
    1. Verify that the data exists 
 5. Test the number of tickets increaced by id (PUT /tourism/:id/increase_tickets)
    1. Enter a valid id 
        1. Verify that the data exists 
    2. Enter invalid id 
 6. Test the number of tickets reduced by id (PUT /tourism/:id/decrease_tickets)
    1. Enter a valid id 
        1. Verify that the data exists 
    2. Enter invalid id
 ### ordersTest 
 7. Test all orders (GET /order)
 8. Test the order by id (GET /order/:id)
    1. Enter a valid id 
    2. Enter invalid id 
 9. Test the order delete by id (DELETE /order/)
    1. Enter a valid id 
        1. Verify that the data exists 
    2. Enter invalid id 
 10. Test the add order and its attributes (POST /order/)
    1. Verify that the data exists 
 11. Test increase the number of tickets purchased by id (PUT /order/:id/increase_booked)
    1. Enter a valid id 
        1. Verify that the data exists 
    2. Enter invalid id 
 12. Test reduce the number of tickets purchased by id (PUT /order/:id/decrease_booked)
    1. Enter a valid id 
        1. Verify that the data exists 
    2. Enter invalid id
### searchTest
 13. Fuzzy search through the part of the Scheduler (POST /search/order)
  
 ## Data model.
 
 . . . . Describe the structure of the database being used by your API. An image (see example below) or JSON represerntation is acceptable . . . . 
 
 ![][datamodel]
 
 
 ## Sample Test execution.
 

 
 ~~~

      GET /order
  (node:1056) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
  Successfully Connected to Attractions on atlas.com
  Successfully Connected to Orders on atlas.com
  GET /order 200 717.148 ms - 1009
        ✓ should return all the Orders (742ms)
      GET /order/:id
        when the id is valid
  GET /order/5db236441c9d440000681f10 200 52.498 ms - 190
          ✓ should return the matching Order (56ms)
        when the id is invalid
          ✓ should return the NOT found message
  GET /order/9999 200 1.906 ms - 222
      DELETE /order/:id
        when the id is valid
  (node:1056) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
  DELETE /order/5dc14aa25ecabb04115e7e74 200 73.451 ms - 41
          ✓ should return a message and the order deleted (76ms)
  GET /order 200 68.508 ms - 794
        when the id is invalid
  DELETE /order/1100001/ 200 0.594 ms - 233
          ✓ should return a message for invalid order id
      POST /order/
  POST /order/ 200 98.131 ms - 177
        ✓ should return confirmation message and update order (101ms)
  GET /order 200 87.873 ms - 1009
      PUT /order/:id/incrementNumOfBooked
        when the id is valid
  PUT /order/5db234d71c9d440000681f0d/increase_booked 200 166.045 ms - 176
          ✓ should return a message and the NumOfBooked increase by 1 (169ms)
          when the id is invalid
  PUT /order/8848/increase_booked 200 0.570 ms - 222
            ✓ should return a 404 and a message for invalid tourism id
      PUT /order/:id/decreaseNumOfBooked
        when the id is valid
  GET /order/5db234d71c9d440000681f0d 200 102.246 ms - 195
  PUT /order/5db234d71c9d440000681f0d/decrease_booked 200 875.330 ms - 176
          ✓ should return a message and the tickets decrease by 1 (878ms)
        when the id is invalid
  PUT /order/999999/decrease_booked 200 0.455 ms - 228
          ✓ should return a 404 and a message for invalid tourism id
  
    Search
      POST /search/order
  GET /order/5db234d71c9d440000681f0d 200 70.874 ms - 195
  POST /search/order 200 93.759 ms - 384
        ✓ should return update order (97ms)
  GET /order 200 60.553 ms - 1009
  
    Tourisms
      GET /tourism
  GET /tourism 200 84.096 ms - 1180
        ✓ should return all the Attractions (87ms)
      GET /tourism/:id
        when the id is valid
  GET /tourism/5db051061c9d440000f65f98 200 70.501 ms - 162
          ✓ should return the matching Attractions (74ms)
        when the id is invalid
          ✓ should return the NOT found message
  GET /tourism/9999 200 0.589 ms - 229
      DELETE /tourism/:id
        when the id is valid
  DELETE /tourism/5dc14aa55ecabb04115e7e75 200 77.159 ms - 46
          ✓ should return a message and the Attraction deleted (80ms)
  GET /tourism 200 69.351 ms - 1003
        when the id is invalid
  DELETE /tourism/1100001/ 200 0.702 ms - 240
          ✓ should return a message for invalid order id
      POST /tourism/
  POST /tourism/ 200 89.067 ms - 156
        ✓ should return confirmation message and update attractions (91ms)
  GET /tourism 200 69.016 ms - 1180
      PUT /tourism/:id/increase_tickets
        when the id is valid
  PUT /tourism/5db051061c9d440000f65f98/increase_tickets 200 140.871 ms - 157
          ✓ should return a message and the tickets increase by 1 (143ms)
          when the id is invalid
  PUT /tourism/8848/increase_tickets 200 0.616 ms - 229
            ✓ should return a 404 and a message for invalid tourism id
      PUT /tourism/:id/decrease_tickets
        when the id is valid
  GET /tourism/5db051061c9d440000f65f98 200 78.006 ms - 162
  PUT /tourism/5db051061c9d440000f65f98/decrease_tickets 200 140.686 ms - 157
          ✓ should return a message and the tickets decrease by 1 (143ms)
        when the id is invalid
  PUT /tourism/8848/decrease_tickets 200 0.495 ms - 229
          ✓ should return a 404 and a message for invalid tourism id
  
  
    21 passing (3s)
 ~~~
 

 ## Extra features.
 *In addition, in order to prevent data changes in the database, this test uses the principle of first increasing the number of data and then reducing the test, and
 And each test needs to copy the id of the test data into the test program (it can be successful without adding, but will increase the number of database data).*
 ## Github Link

 https://github.com/Stephen-Chao/Test-tourismWeb

[datamodel]: model.png
