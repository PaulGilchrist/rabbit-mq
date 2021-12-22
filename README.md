# Learning RabbitMQ
https://www.rabbitmq.com/getstarted.html

Supports cross internet queue federation

```
docker run -d --hostname my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Default port is 5672
Management port is 15672
    http://localhost:15672
Default username and password of guest / guest

## Simple Queue
The simplest thing that does something
* send - Send message to a queue
* receive - Receive message from a queue

## Work Queue (competing consumer)
Distributing tasks among workers (the competing consumers pattern)
* new-task
* worker

## Publish/Subscribe
Sending messages to many consumers at once
* emit-log
* receive-logs

## Routing
Receiving messages selectively
* emit-log-direct
* receive-logs-direct

## Transaction
Allow coupling sending of message only with success of other work
* transaction-send
* transaction-receive

## Kubernetes
Used with [Kubernetes Example Project](https://github.com/PaulGilchrist/kubernetes-example) for monitoring API changes
* receive-api
