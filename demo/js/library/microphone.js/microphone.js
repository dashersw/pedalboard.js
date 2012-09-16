/*
	microphone.js
	Morteza Milani (mrtz.milani@googlemail.com)
	https://github.com/milani/microphone.js
	Published under MIT license
*/

var Mic = {
    mics : [],
    push : function(object){
        this.mics[object.id] = object;
    },
    ready : function(id){
        this.mics[id].ready();
    },
    muted : function(id){
        this.mics[id].onMute();
    },
    data : function(id,data){
        this.mics[id].onSamplesAvailable(data,1);
    },
    error : function(id,code,message){
        this.mics[id].onError(id,code,message);
    }
}

function Microphone(options,callback){

    var defaults = {
        mode       : 2, //Available modes: Recording -> 1, Streaming -> 2
        sampleRate : 44100,
        gain       : 50,
        swfPath    : 'microphone.swf',
        debugging  : true
    }
    
    var validRates = {
        '44': true,
        '22': true,
        '11': true,
        '8' : true,
        '5' : true
    }

    if(typeof options == "function"){
        callback = options;
        options = {};
    }
    
    options = options || {};

    for (var index in defaults) {
	    if (options[index] !== undefined) {
	        defaults[index] = options[index];
	    }
	}

    defaults.sampleRate = parseInt(defaults.sampleRate / 1000);

    if( ! validRates[defaults.sampleRate]){
        defaults.sampleRate = 8;
    }

    this.id = 'mic' + new Date().getTime();

    var objectHTML = '<object id="' + this.id + '" type="application/x-shockwave-flash" data="' + defaults.swfPath + '" width="215" height="138"><param name="movie" value="' + defaults.swfPath + '" /><param name="FlashVars" value="debugging=' + defaults.debugging + '&amp;rate='+defaults.sampleRate+'&amp;id=' + this.id + '&amp;mode=' + defaults.mode + '" /></object>';

    Mic.push(this);

    var self = this;
    
    function insertIntoDom(htmlStr){
        var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        document.body.appendChild(frag);
        
        self.swf = document.getElementById(self.id);
        
    }
    
    this.readyState = false;
    
    this.ready = function(){
        this.readyState = true;
        if(callback) callback.call(this);
    }

    insertIntoDom(objectHTML);
}

Microphone.prototype = {
    get STREAM(){
        return 2;
    },
    get RECORD(){
        return 1;
    },
    get sampleRate(){
        return this.swf.getRate() * 1000;
    },
    set sampleRate(val){
        this.swf.setRate(parseInt(val/1000));
    },
    get channelCount(){
        return 1; //flash supports only mono microphones
    },
    get name(){
        return this.swf.getName();
    },
    set index(val){
        this.swf.setMic(val);
    },
    set loopBack(val){
        this.swf.enableLoopBack(val);
    },
    set onMute(func){
        this.onMute = func;
    },
    on : function(event,callback){
        this[event] = callback;
    },
    getMicrophoneList: function(){
        return this.swf.getMicrophoneList();
    },
    start: function(){
        this.swf.start();
    },
    stop: function(){
        this.swf.stop();
    },
    isReady : function(){
        return this.readyState;
    }
}

