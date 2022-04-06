import {Injectable} from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncrDecrService {

    //The set method is use for encrypt the value.
    encrypt(keys, value){
        const key = CryptoJS.enc.Utf8.parse(keys);
        const iv = CryptoJS.enc.Utf8.parse(keys);
        const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    }

    //The get method is use for decrypt the value.
    decrypt(keys : string, value : string){
        const key = CryptoJS.enc.Utf8.parse(keys);
        const iv = CryptoJS.enc.Utf8.parse(keys);
        const decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
