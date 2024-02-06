const { faker } = require('@faker-js/faker')
const {v4: uuid} = require('uuid')
const CustomError = require('../../CustomError')

class ArtistController {

    static artists = []

    static seeds() {
        for (let i = 0; i < 100; i++) {
            this.artists.push({
                id: faker.string.uuid(),
                name: faker.person.fullName()
            })
        }
    }

    static find() {
        return this.artists
    }

    static findIndex(id) {
        const index = this.artists.findIndex(artist => artist.id === id)

        if(index === -1) {
            throw new CustomError("Artista no encontrado", 404)
        }

        return index
    }

    static findOne(id) {
        return this.artists[this.findIndex(id)]
    }

    static create(data) {
        const newArtist = {
            ...data,
            id: uuid()
        }

        this.artists.push(newArtist)

        return newArtist
    }

    static update(id, data) {
        const foundArtist = this.findOne(id)

        const artistUpdated = {
            ...foundArtist,
            ...data,
            id: foundArtist.id
        }

        this.artists = this.artists.filter(artist => artist.id !== id)
        this.artists.push(artistUpdated)

        return artistUpdated
    }

    static delete(id) {
        this.findOne(id)
        this.artists = this.artists.filter(artist => artist.id !== id)
    }
}

module.exports = ArtistController