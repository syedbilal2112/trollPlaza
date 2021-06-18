exports.PORT = 3000;
exports.HTML_STATUS_CODE = { SUCCESS: 200, CREATED: 201, UNAUTHORIZED: 401, INVALID_DATA: 406, CONFLICT: 409, INTERNAL_ERROR: 500, BAD_REQUEST: 400, NOT_FOUND: 404 };
exports.ROLE = {
    SUPERADMIN: 'SUPERADMIN'
};
exports.APP_SECRETE = 'admin234admin123asdf';
exports.mongodb = {
    host: 'localhost',
    port: 27017,
    db: 'trollPlaza',
    username: '',
    password: ''
}
exports.TRAVEL_TYPE = {
    oneWay: 100,
    return: 200
}
exports.lookup = {
    USER_ROLE: ['SUPERADMIN'],
    TRAVEL_TYPE: [100, 200]
};