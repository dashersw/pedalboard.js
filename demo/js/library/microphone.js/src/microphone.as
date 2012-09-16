/*
    microphone.as
    Morteza Milani (mrtz.milani@googlemail.com)
    https://github.com/milani/microphone.js
    Published under MIT license
*/
package {
    import flash.display.Sprite;
    import flash.text.TextField;
    import flash.media.Microphone;
    import flash.media.SoundCodec;
    import flash.events.StatusEvent;
    import flash.events.ActivityEvent;
    import flash.events.SampleDataEvent;
    import flash.external.ExternalInterface;
    import flash.system.Security;
    import flash.system.Capabilities;

    public class microphone extends Sprite {

        private var mic:Microphone    = null;
        private var debugging:Boolean = false;
        private var JSObject:String   = null;
        private var mode:Number = 1;
        private var RECORD:Number = 1;
        private var STREAM:Number = 2;
        private var data:Array = new Array();
        private var id:String = null;
        
        public function microphone() {

            var flashPlayerVersion:String = Capabilities.version;
            var osArray:Array = flashPlayerVersion.split(' ');
            var versionArray:Array = osArray[1].split(',');
            var majorVersion:Number = parseInt(versionArray[0]);
            var majorRevision:Number = parseInt(versionArray[1])/10;

            var options:Object = this.loaderInfo.parameters;
                        
            debugging = options.debugging  || false;
            JSObject  = options.objectName || "Mic";
            mode      = options.mode       || RECORD;
            id        = options.id;
            
            if(majorVersion + majorRevision < 10.1){
                ExternalInterface.call(JSObject + '.error', id , 3, 'Flash Player 10.1 or above is required');
                ExternalInterface.call('console.log','Flash player does not support samplesAvailable event');
                return;
            }            
            
            Security.showSettings("2");

            mic = Microphone.getMicrophone();
            
            if( null != mic ){
            
                mic.addEventListener(StatusEvent.STATUS,statusHandler);
                mic.addEventListener(ActivityEvent.ACTIVITY,activityHandler);
                mic.codec = SoundCodec.NELLYMOSER;
                mic.setLoopBack(false);
                mic.gain = 50;

                ExternalInterface.addCallback("setMic", setMic);
                ExternalInterface.addCallback("getMicrophoneList", getMicrophoneList);
                ExternalInterface.addCallback("getName", getName);
                ExternalInterface.addCallback("setQuality", setQuality);
                ExternalInterface.addCallback("setGain", setGain);
                ExternalInterface.addCallback("setRate", setRate);
                ExternalInterface.addCallback("getRate", getRate);
                ExternalInterface.addCallback("enableLoopback", enableLoopback);
                ExternalInterface.addCallback("start", start);
                ExternalInterface.addCallback("stop", stop);
                
            }else if(Microphone.isSupported === false){
                this.error(1,"Microphone usage is not supported.");
                this.log("Microphone usage is not supported.");
            }else{
                this.error(2,"No microphone detected.");
                this.log("No microphone detected.");
            }
            ExternalInterface.call(JSObject + '.loaded',id);
        }
        
        public function start():void{
            if(mode == RECORD){
            }else if(mode == STREAM){
                log('started');

                mic.addEventListener(SampleDataEvent.SAMPLE_DATA,streamHandler);
            }
        }
        
        public function stop():void{
            if(mode == RECORD){
                
            }else if(mode == STREAM){
                log('stopped');
                mic.removeEventListener(SampleDataEvent.SAMPLE_DATA,streamHandler);
            }
        }
        
        public function streamHandler(event:SampleDataEvent):void {
            var data:Array = new Array();
            while(event.data.bytesAvailable){
                var sample:Number = event.data.readFloat();
                data.push(sample);
            }
            ExternalInterface.call(JSObject + '.data', id, data);
        }

        public function enableLoopback(state:Boolean):void{
            mic.setLoopBack(state);
        }
        
        public function setQuality(quality:Number):void{
            mic.encodeQuality = quality;
        }
        
        public function setGain(gain:Number):void{
            mic.gain = gain;
        }
        
        public function setRate(rate:Number):void{
            log("setRate: " + rate);
            mic.rate = rate;
        }

        public function getRate():Number{
            log("getrate: " + mic.rate);
            return mic.rate;
        }
        
        public function getName():String{
            return Microphone.names[mic.index];
        }
        
        public function setMic(index:Number):Boolean{
            mic = Microphone.getMicrophone(index);
            ExternalInterface.call('console.log', "Microphone changed");
            return true;
        }

        public function getMicrophoneList():Array{
            var list:Array = new Array();

            for (var i:Number = 0, l:Number = Microphone.names.length; i < l; i++) {
                list[i] = Microphone.names[i];
            }
            return list;
        }
        
        public function error(code:Number,message:String):void{
            //ExternalInterface.call(JSObject + '.error',id,code,message);
        }
        
        public function log(message:*):void{
            if(debugging){
                ExternalInterface.call('console.log',message);
            }
        }
        
        public function statusHandler(event:StatusEvent):void{
            if(event.code == "Microphone.Unmuted"){
                ExternalInterface.call(JSObject + '.ready',id);
                ExternalInterface.call('console.log', "Status: " +  event);
            }else if( event.code == "Microphone.Muted" ){
                ExternalInterface.call(JSObject + '.muted',id);
                ExternalInterface.call('console.log', "Status: " +  event);
            }
        };

        public function activityHandler(event:ActivityEvent):void{
            ExternalInterface.call('console.log', "Activity: "+mic.activityLevel +" : "+event);
        };
    }
}
