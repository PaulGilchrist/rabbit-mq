# Event Messaging Transactions

There are two recommended best practices for ensuring SQL updates and event messages either both succeed or both fail

## Method #1 - AMQP Transactions

```javascript
  channel.txSelect();
  let messageSent = channel.send(message);
  if (messageSent) {
    let sqlUpdated = sql.update();
    if(sqlUpdated) {
      channel.txCommit();
      return success;
    }
  }
  channel.txRollback();  
```

## Method #2 - SQL Tracking Failure

### Main Process
```javascript
  let sqlUpdated = sql.updateData();
  if(sqlUpdated) {
    let eventMessageSent = channel.send(eventMessage);
    if (eventMessageSent) {
        return success;
    } else {
        sql.insertFailedEventMessage(eventMessage);
    }
  }
```

### Separate Polling Process
```javascript
  let failedEventMessages = sql.getFailedEventMessages(); // oldest to newest
  failedEventMessages.forEach(eventMessage => {
    let eventMessageSent = channel.send(eventMessage);
    if (eventMessageSent) {
        sql.deleteFailedEventMessage(eventMessage.id);
    }
  })
```