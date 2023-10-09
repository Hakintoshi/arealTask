var crypto = require("crypto");

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

function enCrypt (str) {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(str, "utf-8", "hex")
    encrypted += cipher.final("hex")
    return encrypted
}

function deCrypt (encryptedStr) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv)
    let decrypted = decipher.update(encryptedStr, "hex", "utf-8")
    decrypted += decipher.final("utf8")
    return decrypted
}

module.exports = {enCrypt, deCrypt}