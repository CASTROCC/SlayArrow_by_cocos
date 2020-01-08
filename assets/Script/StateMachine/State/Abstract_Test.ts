abstract class ITest {

    abstract Execute(): void;
    
    constructor() {
        console.log("1111");
    }
};


class Test extends ITest {
    constructor() {
        super();

        this.Execute();
    }


    Execute() {
        console.log("2222");
    }
}


new Test();