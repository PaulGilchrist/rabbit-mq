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