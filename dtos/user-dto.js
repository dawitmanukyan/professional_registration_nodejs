module.exports = class UserDto {
    email;
    id;
    activated;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.activated = model.activated;
    }
}
