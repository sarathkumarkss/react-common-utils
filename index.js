import forge from "node-forge";

// RSA Keys
const REACT_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWfd2W90S3Y/bl
1x0cM7KkMpL6KLbZDVIp2Z2GB7Bkg980PP6UlfiX3xJJ6eOjF4/0+Vr1CtaKun6B
ZK0kZnDg/Ncd8l53jstiJPwPGROWW/w1pu6KcEPV580vYc5BE6eoiGe3s01+zwiM
ZXYO7AJ+jvJqen5qfCvIxiM0fIF8ifd6xgY3ZFu2f18zs/k+WL1O9m/WhJbhjzML
CKIzWQbuCD22+GBj91B6FbPvmJVH8GewNqYnlKoZFiK10BNwLWAfeyuTZzcwJEkV
xkGQbHbS44nN9ovxSZr91lrKJuDW2uNK87n5+0m7s3VKQomP+4urJcdE65bcHmQ3
lMMmjEEDAgMBAAECggEAOYDxAWI1V/1C2ge71C2//OlaIhr8OmCp4HJpGt/A2JHK
K1UW43r5dK3nV02PK9BLVd/sFLndHsA03jfBe3rDVG40teCelur/d8Z2lQ2iBLOQ
gEnKte63IQfOKJ/ODgBY+IPpWoSFiDO1FP62kfWQDaIBN66zaZT0oBUOpymiBWLx
tppCck5mvnGhOY4JvQcGBJnsB+60C2vDGIa3eKgpezc9T4ivGIr/jrKjXuxfpM51
Be1BWkc5M1nCVD0fHdsHQ2d8FhPJvU/wpTa56vS5IMlCvzDPU4EhQtJ+a8ttfCWH
qOkgZEzCRWt13XvY4wN4jh4EDbVj4PQ7DwAhdIo7EQKBgQD7DDTH7u7Sq3y/PqoR
OFJt+oMyatVFCLZc2xaHY5AstgzPfhcENwr8YLj/osmOYAhifCLegEqHuLparCQ+
5+yB536aUFKhAq8h3bBfLkkcQ2SF47dQAxNQKimGCtI15T9uM0P4GZWbx5/PYokg
oABwtIx9qHKOq4QnCZhhAUosfwKBgQDauQ0TUlNPGWZ3HS0PZ/R9YKG9NEckeS5q
PxKJycIAmxufi8GWcFLuWDcrlC1+EtuqzcK4pyKvfvEwmB5NxZ8QMEDhYDkLToH5
xajaWF3d5367Dpd+TuTVTbgtgWFLzlUV8S4t6Lbxu1gNKmbvyZj3VJGe/0R36OpC
QuQ4HXP5fQKBgBUy3KodVPFZJbmIcxftJ5i91KJHPycLK0r//REFqUD9Rmum/A6R
D05sZHLBrj9lgI/AZ7leH+0B/kp1ysG9F82IXLpvGesarOsxKxl+cRH/5tcfeXU6
LUFRrhvxgfqnFwoZLh4fGvEClE4Qxf+JQ0BBHrPlq3a8qPYa61EVqMvFAoGAPzoZ
RomY3ZfJIAvGF9sEOS4y8x/mpOuG+F2tPTmepFAyRwe+eX+U6aOEp0tZb0WCTLjY
XkqqYzL+A/8lW3QSTDq2tq/7LYKPXiW+bwf2coxV/Tr1niSuT978q+LnvmMyA3rJ
z6mjIPP4Oy4TvaN4XZ8LzXubTlJ9TZRKptIU0X0CgYEAvYPX1kGfmbbUraZf1/lk
wpMBmlaOADUSn/4bWkjUxMrSqh9Bbr7zK8NPwKBNy15ZKj+i43J3MmjWA0BXfiZA
lmo28+L1vl48x9QKeFgEixArmlRoSwnKZybtG3XCgcprPT4VNQKTN76PJq5Fxygo
7cGyHEQxaXvPVK8YO+B3K0Y=
-----END PRIVATE KEY-----`;

const REACT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1n3dlvdEt2P25dcdHDOy
pDKS+ii22Q1SKdmdhgewZIPfNDz+lJX4l98SSenjoxeP9Pla9QrWirp+gWStJGZw
4PzXHfJed47LYiT8DxkTllv8NabuinBD1efNL2HOQROnqIhnt7NNfs8IjGV2DuwC
fo7yanp+anwryMYjNHyBfIn3esYGN2Rbtn9fM7P5Pli9TvZv1oSW4Y8zCwiiM1kG
7gg9tvhgY/dQehWz75iVR/BnsDamJ5SqGRYitdATcC1gH3srk2c3MCRJFcZBkGx2
0uOJzfaL8Uma/dZayibg1trjSvO5+ftJu7N1SkKJj/uLqyXHROuW3B5kN5TDJoxB
AwIDAQAB
-----END PUBLIC KEY-----`;

// Encrypt Data
export const encryptData = (data) => {
    try {
        const aesKey = generateAESKey();
        const iv = generateAESKey();
        const encryptedData = encryptAES(data, aesKey, iv);
        const encryptedAesKey = encryptRSA(aesKey);

        return {
            encryptedData: forge.util.encode64(encryptedData),
            encryptedAesKey: forge.util.encode64(encryptedAesKey),
            iv: forge.util.encode64(iv),
        };
    } catch (error) {
        // console.error("Encryption failed:", error);
        return null;
    }
};

// Decrypt Data
export const decryptData = (encryptedData, encryptedAesKey, iv) => {
    try {
        const aesKey = decryptRSA(encryptedAesKey);
        // console.log("Decrypted data:", decryptAES(encryptedData, aesKey, iv))
        return decryptAES(encryptedData, aesKey, iv);
    } catch (error) {
        // console.error("Decryption failed:", error);
        return null;
    }
};

// Utility Functions
const generateAESKey = () => forge.random.getBytesSync(16);
const encryptAES = (data, aesKey, iv) => {
    const cipher = forge.cipher.createCipher("AES-CBC", aesKey);
    cipher.start({ iv });
    cipher.update(forge.util.createBuffer(data, "utf8"));
    cipher.finish();
    return cipher.output.getBytes();
};
const decryptAES = (encryptedData, aesKey, iv) => {
    const decipher = forge.cipher.createDecipher("AES-CBC", aesKey);
    decipher.start({ iv: forge.util.decode64(iv) });
    decipher.update(forge.util.createBuffer(forge.util.decode64(encryptedData)));
    decipher.finish();
    return decipher.output.toString("utf8");
};
const encryptRSA = (data) => forge.pki.publicKeyFromPem(REACT_PUBLIC_KEY).encrypt(data, "RSA-OAEP", { md: forge.md.sha256.create() });
const decryptRSA = (data) => forge.pki.privateKeyFromPem(REACT_PRIVATE_KEY).decrypt(forge.util.decode64(data), "RSA-OAEP", { md: forge.md.sha256.create() });