<!-- Map -->
```js

var myObject = { 'a': 1, 'b': 2, 'c': 3 };

Object.keys(myObject).forEach(function(key, index) {
  myObject[key] *= 2;
});

console.log(myObject);
// => { 'a': 2, 'b': 4, 'c': 6 }
```


```js
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('key', 'value');
const value = await client.get('key');
await client.disconnect();
```

<!-- createClient({
  url: 'redis://alice:foobared@awesome.redis.server:6380'
}); -->

```
To check if the the client is connected and ready to send commands, use client.isReady which returns a boolean. client.isOpen is also available. This returns true when the client's underlying socket is open, and false when it isn't (for example when the client is still connecting or reconnecting after a network error).
```