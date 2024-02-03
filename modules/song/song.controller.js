const { faker, th } = require('@faker-js/faker')
const {v4: uuid} = require('uuid')

class SongController {
    constructor() {
        this.songs = []
    }

    seeds() {
        for (let i = 0; i < 100; i++) {
            this.songs.push({
                id: faker.string.uuid(),
                name: faker.music.songName(),
                artist: faker.person.fullName()
            })
        }
    }

    find() {
        return this.songs
    }

    findIndex(id) {
        return this.songs.findIndex(song => song.id === id)
    }

    findOne(id) {
        return this.songs[this.findIndex(id)]
    }

    create(data) {
        const newSong = {
            ...data,
            id: uuid()
        }

        this.songs.push(newSong)

        return newSong
    }

    update(id, data) {
        const foundSong = this.findOne(id)

        const songUpdated = {
            ...foundSong,
            ...data,
            id: foundSong.id
        }

        this.songs = this.songs.filter(song => song.id !== id)
        this.songs.push(songUpdated)

        return songUpdated
    }

    delete(id) {
        this.songs = this.songs.filter(song => song.id !== id)
    }
}

module.exports = SongController