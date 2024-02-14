const { faker, th } = require('@faker-js/faker')
const {v4: uuid} = require('uuid')
const CustomError = require('../../CustomError')
const ArtistiController = require('../artist/artist.controller')

class SongController {

    static songs = []
    
    static seeds() {
        for (let i = 0; i < 100; i++) {
            this.songs.push({
                id: faker.string.uuid(),
                name: faker.music.songName(),
                artist: faker.person.fullName()
            })
        }
    }

    static find() {
        const songs = this.songs.map(song => ({
            ...song,
            artist: ArtistiController.findOne(song.artistId).name
        }))

        return songs
    }

    static findIndex(id) {
        const index = this.songs.findIndex(song => song.id === id)

        if(index === -1) {
            throw new CustomError("Canción no encontrada", 404)
        }

        return index
    }

    static findOne(id) {
        const foundSong = this.songs[this.findIndex(id)]

        return {
            ...foundSong,
            artist: ArtistiController.findOne(foundSong.artistId).name
        }
    }

    static create(data) {

        ArtistiController.findOne(data.artistId)

        const newSong = {
            ...data,
            id: uuid()
        }

        this.songs.push(newSong)

        return this.findOne(newSong.id)
    }

    static update(id, data) {
        
        if(data.artistId) {
            ArtistiController.findOne(data.artistId)
        }

        const foundSong = this.findOne(id)

        const songUpdated = {
            ...foundSong,
            ...data,
            id: foundSong.id
        }

        this.songs = this.songs.filter(song => song.id !== id)
        this.songs.push(songUpdated)

        return this.findOne(id)
    }

    static delete(id) {
        this.findOne(id)
        this.songs = this.songs.filter(song => song.id !== id)
    }
}

module.exports = SongController