
type callbacks = {
    baseFunc: Function;
    userFunc: Function;
    thiz: any;
    Tid: number;
};
export default class AudioUtils {

    private static _playingAudios: {
        [key: string]: callbacks
    } = {};


    /**
     * 创建音频， 并返回音频分析器
     * @param clips 
     */
    public static PlayAudioByAnalyser(clips: cc.AudioClip ): AnalyserNode {
        let audioContext = new AudioContext();
        let audioBuffer: AudioBufferSourceNode = audioContext.createBufferSource();

        if (typeof clips === "string") {
            (<any>cc.AudioClip)._loadByUrl(clips, function (err, clip) {
                if (clip) {
                    clips = clip;
                }
            });
        }
        
        audioBuffer.buffer = (clips as any)._audio;
        // 创建分析器
        let analyser = audioContext.createAnalyser();
        // 分析精度
        analyser.fftSize = 256;
        // 链接分析器
        audioBuffer.connect(analyser);  
        analyser.connect(audioContext.destination);
        audioBuffer.start(0);
        return <any>analyser;        
    }
    
    /**
     * 停止所有正在播放音乐
     */
    public static stopAllPlayingAudio(): void {
        this._stopAllPlayingAudio();
    }

    /**
     * 播放clip
     * @param clip 
     * @param userFunc 
     * @param thiz 
     */
    public static playAudio(clip: cc.AudioClip, userFunc?: Function, thiz?: any): void {
        if (!clip) {
            return ;
        }
        this._playAudio(clip, userFunc, thiz);
    }

    /**
     * 停止指定音乐
     * @param id 
     */
    public static stopAudio(id: number): void {
        if (typeof id === "undefined") {
            return;
        }
        this._stopAudio(id);
    }


    private static _stopAllPlayingAudio(): void {
        let keys: string[] = Object.keys(this._playingAudios);
        let id: number;
        while (keys.length) {
            id = parseInt(keys.shift());
            if (id && !isNaN(id)) {
                this._stopAudio(id);
            }
        }
    }
    
    private static _playAudio(clip: cc.AudioClip, userFunc?: Function, thiz?: any): number {
        if (clip) {
            let id: number = cc.audioEngine.playEffect(clip, false);
            if (typeof id === "undefined") {
                id = Math.random() + Date.now();
            }
            let time: number = cc.audioEngine.getDuration(id);
            let baseFunc: Function = () => {
                let keys: string[] = Object.keys(this._playingAudios);
                let inx: number = keys.indexOf(id.toString());
                if ( inx != -1) {
                    let calls: callbacks = this._playingAudios[id.toString()];
                    calls.userFunc && calls.thiz && calls.userFunc.call(calls.thiz);
                    this._playingAudios[keys[inx]] = null;
                    delete this._playingAudios[keys[inx]];
                }    
            }
            let Tid = setTimeout(baseFunc.bind(this), time);
            this._playingAudios[id.toString()] = {baseFunc: baseFunc, userFunc: userFunc, thiz: thiz, Tid: Tid} as callbacks;
            return id;
        }
        return null;
    }

    
    private static _stopAudio(id: number): void {
        let keys: string[] = Object.keys(this._playingAudios);
        let key: string = id.toString();
        if (keys.indexOf(key) !== -1) {
            cc.audioEngine.stopEffect(id);
            let calls: callbacks = this._playingAudios[key];
            if (calls != null) {
                clearTimeout(calls.Tid);
            } 
            this._playingAudios[key] = null;
            delete this._playingAudios[key];
        }
    }

}
