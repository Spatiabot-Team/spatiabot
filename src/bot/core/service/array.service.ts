export abstract class ArrayService {

    static shuffle(array : any[]): any[] {

        let i = array.length - 1;
        for(i; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array;
    }
}




