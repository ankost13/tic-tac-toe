let instance = null;

export class GameHowler {

    constructor(soundsData) {
        this.sounds = [];
        console.error(soundsData)
        soundsData.forEach((item) => {
            const sound = new Howl(item);
            this.sounds.push(sound);
        });
    }

    static getInstance(soundsData) {
        if (!soundsData) return
        console.error(instance)
        if (instance === null) {
            return new GameHowler(soundsData);
        } else {
            return instance;
        }
    }

    play(soundName) {
        let sound = null;
        this.sounds.forEach( el=> {
            if (el.name === soundName) {
                sound = el
            }
        })

        if (sound) {
            sound.play();
        } else {
            console.error(`Звук "${soundName}" не знайдено.`);
        }
    }
}