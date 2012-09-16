# About

This is a script that provide access to microphone throw Flash.

You can stream voices, get user voice raw data, record and play
voice all in javascript!

## Example

```javascript
var mic = new Microphone(function(){//called when user allows access
    mic.sampleRate = 44100;

    //when samples are available, this function is called
    mic.onSamplesAvailable = function(data){
        console.log(data);
    };
    //starts streaming
    mic.start();

    setTimeout(function(){
        mic.stop();
    },2000);
});
```
## Attention

This script is in his early days! Try it, but don't use in production.

## License

Code is published under MIT License
