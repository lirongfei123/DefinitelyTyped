// tests based on http://jasmine.github.io/2.2/introduction.html

describe("A suite", () => {
    it("contains spec with an expectation", () => {
        expect(true).toBe(true);
    });
});

describe("A suite is just a function", () => {
    var a: boolean;

    it("and so is a spec", () => {
        a = true;
        expect(a).toBe(true);
    });
});

describe("The 'toBe' matcher compares with ===", () => {
    it("and has a positive case", () => {
        expect(true).toBe(true);
    });

    it("and can have a negative case", () => {
        expect(false).not.toBe(true);
    });
});

describe("Included matchers:", () => {
    it("The 'toBe' matcher compares with ===", () => {
        const a = 12;
        const b = a;

        expect(a).toBe(b);
        expect(a).not.toBe(24);
    });

    describe("The 'toEqual' matcher", () => {
        it("works for simple literals and variables", () => {
            const a = 12;
            expect(a).toEqual(12);
        });

        it("should work for objects", () => {
            const foo = {
                a: 12,
                b: 34
            };
            const bar = {
                a: 12,
                b: 34
            };
            expect(foo).toEqual(bar);
        });

        it("should work for optional values", () => {
            const opt: string | undefined = Math.random() > .5  ? "s" : undefined;
            expect(opt).toEqual(undefined);
        });
    });

    it("The 'toMatch' matcher is for regular expressions", () => {
        const message = "foo bar baz";

        expect(message).toMatch(/bar/);
        expect(message).toMatch("bar");
        expect(message).not.toMatch(/quux/);
    });

    it("The 'toBeDefined' matcher compares against `undefined`", () => {
        const a = {
            foo: "foo"
        };

        expect(a.foo).toBeDefined();
        expect((a as any).bar).not.toBeDefined();
    });

    it("The `toBeUndefined` matcher compares against `undefined`", () => {
        const a = {
            foo: "foo"
        };

        expect(a.foo).not.toBeUndefined();
        expect((a as any).bar).toBeUndefined();
    });

    it("The 'toBeNull' matcher compares against null", () => {
        const a: string | null = Math.random() > 0.5 ? "s" : null;
        const foo = "foo";

        expect(null).toBeNull();
        expect(a).toBeNull();
        expect(foo).not.toBeNull();
    });

    it("The 'toBeTruthy' matcher is for boolean casting testing", () => {
        const a: string | undefined = Math.random() > 0.5 ? "s" : undefined;
        const foo = "foo";

        expect(foo).toBeTruthy();
        expect(a).not.toBeTruthy();
    });

    it("The 'toBeFalsy' matcher is for boolean casting testing", () => {
        const a: string | undefined = Math.random() > 0.5 ? "s" : undefined;
        const foo = "foo";

        expect(a).toBeFalsy();
        expect(foo).not.toBeFalsy();
    });

    it("The 'toContain' matcher is for finding an item in an Array", () => {
        const a = ["foo", "bar", "baz"];

        expect(a).toContain('foo');
        expect(a).not.toContain("quux");
    });

    it("The 'toContain' matcher is also for finding an object containing distinct properties in an Array", () => {
        const a = [{ a: "foo" }, { a: "bar" }, { b: "baz" }];

        expect(a).toContain(jasmine.objectContaining({ a: "foo" }));
        expect(a).not.toContain({ a: "quux" });
    });

    it("The 'toBeLessThan' matcher is for mathematical comparisons", () => {
        const pi = 3.1415926;
        const e = 2.78;

        expect(e).toBeLessThan(pi);
        expect(pi).not.toBeLessThan(e);
    });

    it("The 'toBeGreaterThan' is for mathematical comparisons", () => {
        const pi = 3.1415926;
        const e = 2.78;

        expect(pi).toBeGreaterThan(e);
        expect(e).not.toBeGreaterThan(pi);
    });

    it("The 'toBeCloseTo' matcher is for precision math comparison", () => {
        const pi = 3.1415926;
        const e = 2.78;

        expect(pi).not.toBeCloseTo(e, 2);
        expect(pi).toBeCloseTo(e, 0);
    });

    it("The 'toThrow' matcher is for testing if a function throws an exception", () => {
        const foo = () => {
            return 1 + 2;
        };
        const bar = () => {
            throw new Error("message");
        };

        expect(foo).not.toThrow();
        expect(foo).toThrow();

        expect(bar).not.toThrow();
        expect(bar).toThrow();
    });

    it("The 'toThrowError' matcher is for testing a specific thrown exception", () => {
        const foo = () => {
            throw new TypeError("foo bar baz");
        };

        expect(foo).toThrowError("foo bar baz");
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, "foo bar baz");
    });

    it("async matchers", async () => {
        const badness = new Error("badness");
        await expectAsync(Promise.resolve()).toBeResolved();
        await expectAsync(Promise.resolve()).toBeResolved("good job");
        await expectAsync(Promise.resolve(true)).toBeResolvedTo(true);
        await expectAsync(Promise.reject(badness)).toBeRejected();
        await expectAsync(Promise.reject(badness)).toBeRejected("bad mojo");
        await expectAsync(Promise.reject(badness)).toBeRejectedWith(badness);
        await expectAsync(Promise.resolve()).withContext("additional info").toBeResolved();
    });

    it("async matchers - not", async () => {
        const badness = new Error("badness");
        const malady = new Error("malady");
        await expectAsync(Promise.reject(badness)).not.toBeResolved();
        await expectAsync(Promise.resolve(true)).not.toBeResolvedTo(false);
        await expectAsync(Promise.resolve()).not.toBeRejected();
        await expectAsync(Promise.reject(badness)).not.toBeRejectedWith(malady);
        await expectAsync(Promise.reject(badness)).not.withContext("additional info").toBeResolved();
        await expectAsync(Promise.reject(badness)).withContext("additional info").not.toBeResolved();
    });
});

describe("toThrowMatching", () => {
    expect(() => {
        ({} as any).doSomething();
    }).toThrowMatching(error => error !== undefined);
});

describe("toBeNegativeInfinity", () => {
    expect("").toBeNegativeInfinity();
});

describe("toBePositiveInfinity", () => {
    expect("").toBePositiveInfinity();
});

describe("toHaveClass", () => {
    expect("").toHaveClass(Array);
});

describe("A spec", () => {
    it("is just a function, so it can contain any code", () => {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", () => {
        var foo = 0;
        foo += 1;

        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});

describe("A spec (with setup and tear-down)", () => {
    var foo: number;

    beforeEach(() => {
        foo = 0;
        foo += 1;
    });

    afterEach(() => {
        foo = 0;
    });

    it("is just a function, so it can contain any code", () => {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", () => {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });
});

describe("A spec", () => {
    var foo: number;

    beforeEach(() => {
        foo = 0;
        foo += 1;
    });

    afterEach(() => {
        foo = 0;
    });

    it("is just a function, so it can contain any code", () => {
        expect(foo).toEqual(1);
    });

    it("can have more than one expectation", () => {
        expect(foo).toEqual(1);
        expect(true).toEqual(true);
    });

    describe("nested inside a second describe", () => {
        var bar: number;

        beforeEach(() => {
            bar = 1;
        });

        it("can reference both scopes as needed", () => {
            expect(foo).toEqual(bar);
        });
    });
});

describe("withContext", () => {
    it("can be used after an expectation", () => {
        expect(1).withContext('context message').toBe(1);
    });
});

xdescribe("A spec", () => {
    var foo: number;

    beforeEach(() => {
        foo = 0;
        foo += 1;
    });

    it("is just a function, so it can contain any code", () => {
        expect(foo).toEqual(1);
    });
});

describe("Pending specs", () => {
    xit("can be declared 'xit'", () => {
        expect(true).toBe(false);
    });

    it("can be declared with 'it' but without a function");

    it("can be declared by calling 'pending' in the spec body", () => {
        expect(true).toBe(false);
        pending(); // without reason
        pending('this is why it is pending');
    });
});

describe("A spy", () => {
    var foo: any, bar: any, baz: any = null;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            setBaz: (value: any) => {
                baz = value;
            }
        };

        spyOn(foo, 'setBar');
        spyOn(foo, 'setBaz');

        foo.setBar(123);
        foo.setBar(456, 'another param');
        foo.setBaz(789);
    });

    it("tracks that the spy was called", () => {
        expect(foo.setBar).toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", () => {
        expect(foo.setBar).toHaveBeenCalledWith(123);
        expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
    });

    it("tracks the order in which spies were called", () => {
        expect(foo.setBar).toHaveBeenCalledBefore(foo.setBaz);
    });

    it("stops all execution on a function", () => {
        expect(bar).toBeNull();
    });

    it("tracks if it was called at all", function() {
        foo.setBar();

        expect(foo.setBar.calls.any()).toEqual(true);
    });
});

describe("A spy, when configured to call through", () => {
    var foo: any, bar: any, fetchedBar: any;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            getBar: () => {
                return bar;
            }
        };

        spyOn(foo, 'getBar').and.callThrough();

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", () => {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", () => {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", () => {
        expect(fetchedBar).toEqual(123);
    });
});

describe("A spy, when configured to fake a return value", () => {
    var foo: any, bar: any, fetchedBar: any;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            getBar: () => {
                return bar;
            }
        };

        spyOn(foo, "getBar").and.returnValue(745);

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", () => {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", () => {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", () => {
        expect(fetchedBar).toEqual(745);
    });
});

describe("A spy, when configured to fake a series of return values", () => {
    var foo: any, bar: any;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            getBar: () => {
                return bar;
            }
        };

        spyOn(foo, "getBar").and.returnValues("fetched first", "fetched second");

        foo.setBar(123);
    });

    it("tracks that the spy was called", () => {
        foo.getBar(123);
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not affect other functions", () => {
        expect(bar).toEqual(123);
    });

    it("when called multiple times returns the requested values in order", () => {
        expect(foo.getBar()).toEqual("fetched first");
        expect(foo.getBar()).toEqual("fetched second");
        expect(foo.getBar()).toBeUndefined();
    });
});

describe("A spy, when configured with an alternate implementation", () => {
    var foo: any, bar: any, fetchedBar: any;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            getBar: () => {
                return bar;
            }
        };

        spyOn(foo, "getBar").and.callFake(() => {
            return 1001;
        });

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", () => {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", () => {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", () => {
        expect(fetchedBar).toEqual(1001);
    });
});

describe("A spy, when configured with alternate implementations for specified arguments", () => {
    var foo: any, bar: any, fetchedBar: any;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            getBar: () => {
                return bar;
            }
        };

        spyOn(foo, "getBar")
            .withArgs(1, "2")
            .and.callFake(() => 1002);

        foo.setBar(123);
        fetchedBar = foo.getBar(1, "2");
    });

    it("tracks that the spy was called", () => {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", () => {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", () => {
        expect(fetchedBar).toEqual(1002);
    });
});

describe("A spy, when configured to throw a value", () => {
    var foo: any, bar: any;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            }
        };

        spyOn(foo, "setBar").and.throwError("quux");
    });

    it("throws the value", () => {
        expect(() => {
            foo.setBar(123);
        }).toThrowError("quux");
    });
});

describe("A spy, when configured with multiple actions", () => {
    var foo: any, bar: any, fetchedBar: any;
    var fakeCalled = false;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            },
            getBar: () => {
                return bar;
            }
        };

        spyOn(foo, 'getBar').and.callThrough().and.callFake(() => {
            fakeCalled = true;
        });

        foo.setBar(123);
        fetchedBar = foo.getBar();
    });

    it("tracks that the spy was called", () => {
        expect(foo.getBar).toHaveBeenCalled();
    });

    it("should not effect other functions", () => {
        expect(bar).toEqual(123);
    });

    it("when called returns the requested value", () => {
        expect(fetchedBar).toEqual(123);
    });

    it("should have called the fake implementation", () => {
        expect(fakeCalled).toEqual(true);
    });
});

describe("A spy", () => {
    var foo: any, bar: any = null;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            }
        };

        spyOn(foo, 'setBar').and.callThrough();
    });

    it("can call through and then stub in the same spec", () => {
        foo.setBar(123);
        expect(bar).toEqual(123);

        foo.setBar.and.stub();
        bar = null;

        foo.setBar(123);
        expect(bar).toBe(null);
    });
});

describe("A spy", () => {
    var foo: any, bar: any = null;

    beforeEach(() => {
        foo = {
            setBar: (value: any) => {
                bar = value;
            }
        };

        spyOn(foo, 'setBar');
    });

    it("tracks if it was called at all", () => {
        expect(foo.setBar.calls.any()).toEqual(false);

        foo.setBar();

        expect(foo.setBar.calls.any()).toEqual(true);
    });

    it("tracks the number of times it was called", () => {
        expect(foo.setBar.calls.count()).toEqual(0);

        foo.setBar();
        foo.setBar();

        expect(foo.setBar.calls.count()).toEqual(2);
    });

    it("tracks the arguments of each call", () => {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.argsFor(0)).toEqual([123]);
        expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);
    });

    it("tracks the arguments of all calls", () => {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.allArgs()).toEqual([[123], [456, "baz"]]);
    });

    it("can provide the context and arguments to all calls", () => {
        foo.setBar(123);

        expect(foo.setBar.calls.all()).toEqual([{ object: foo, args: [123], returnValue: undefined }]);
    });

    it("has a shortcut to the most recent call", () => {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.mostRecent()).toEqual({ object: foo, args: [456, "baz"], returnValue: undefined });
    });

    it("has a shortcut to the first call", () => {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.first()).toEqual({ object: foo, args: [123], returnValue: undefined });
    });

    it("can be reset", () => {
        foo.setBar(123);
        foo.setBar(456, "baz");

        expect(foo.setBar.calls.any()).toBe(true);

        foo.setBar.calls.reset();

        expect(foo.setBar.calls.any()).toBe(false);
    });
});

describe("A spy, when created manually", () => {
    var whatAmI: any;

    beforeEach(() => {
        whatAmI = jasmine.createSpy('whatAmI');

        whatAmI("I", "am", "a", "spy");
    });

    it("is named, which helps in error reporting", () => {
        expect(whatAmI.and.identity()).toEqual('whatAmI');
    });

    it("tracks that the spy was called", () => {
        expect(whatAmI).toHaveBeenCalled();
    });

    it("tracks its number of calls", () => {
        expect(whatAmI.calls.count()).toEqual(1);
    });

    it("tracks all the arguments of its calls", () => {
        expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
    });

    it("allows access to the most recent call", () => {
        expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
    });
});

describe("Multiple spies, when created manually", () => {
    class Tape {
        private rewindTo: number;
        play(): void { };
        pause(): void { };
        rewind(pos: number): void {
            this.rewindTo = pos;
        };
        stop(): void { };
        readonly isPlaying: boolean; // spy obj makes this writable
    }

    var tape: Tape;
    var tapeSpy: jasmine.SpyObj<Tape>;
    var el: jasmine.SpyObj<Element>;

    beforeEach(() => {
        tapeSpy = jasmine.createSpyObj<Tape>('tape', ['play', 'pause', 'stop', 'rewind']);
        tape = tapeSpy;
        (tape as { isPlaying: boolean }).isPlaying = false;
        el = jasmine.createSpyObj<Element>('Element', ['hasAttribute']);

        el.hasAttribute.and.returnValue(false);
        el.hasAttribute("href");

        tape.play();
        tape.pause();
        tape.rewind(0);

        tapeSpy.play.and.callThrough();
        tapeSpy.pause.and.callThrough();
        tapeSpy.rewind.and.callThrough();
    });

    it("creates spies for each requested function", () => {
        expect(tape.play).toBeDefined();
        expect(tape.pause).toBeDefined();
        expect(tape.stop).toBeDefined();
        expect(tape.rewind).toBeDefined();
    });

    it("tracks that the spies were called", () => {
        expect(tape.play).toHaveBeenCalled();
        expect(tape.pause).toHaveBeenCalled();
        expect(tape.rewind).toHaveBeenCalled();
        expect(tape.stop).not.toHaveBeenCalled();
    });

    it("tracks all the arguments of its calls", () => {
        expect(tape.rewind).toHaveBeenCalledWith(0);
    });

    it("read isPlaying property", () => {
        expect(tape.isPlaying).toBe(false);
    });
});

describe("multiple spies, when created with spyOnAllFunctions", () => {
    it("spies on all functions", () => {
        const obj = {
            x: (a: number) => a,
            y: (a: number) => a,
        };

        spyOnAllFunctions(obj);

        obj.x(0);
        obj.y(1);

        expect(obj.x).toHaveBeenCalled();
        expect(obj.y).toHaveBeenCalledWith(1);
    });
});

describe("jasmine.nothing", () => {
    it("matches any value", () => {
        expect().nothing();
    });
});

describe("jasmine.any", () => {
    it("matches any value", () => {
        expect({}).toEqual(jasmine.any(Object));
        expect(12).toEqual(jasmine.any(Number));
    });

    it("matches any function", () => {
        interface Test {
            fn1(): void;
            fn2(param1: number): number;
        }

        const a: Test = {
            fn1: () => { },
            fn2: (param1: number) => param1,
        };

        const expected: Test = {
            fn1: jasmine.any(Function),
            fn2: jasmine.any(Function),
        };

        expect(a).toEqual(expected);
    });

    describe("when used with a spy", () => {
        it("is useful for comparing arguments", () => {
            const foo = jasmine.createSpy('foo');
            foo(12, () => {
                return true;
            });

            expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
        });
    });
});

describe("jasmine.objectContaining", () => {
    interface fooType {
        a: number;
        b: number;
        bar: string;
    }
    var foo: fooType;

    beforeEach(() => {
        foo = {
            a: 1,
            b: 2,
            bar: "baz"
        };
    });

    it("matches objects with the expect key/value pairs", () => {
        // not explictly providing the type on objectContaining only guards against
        // missmatching types on know properties
        expect(foo).not.toEqual(jasmine.objectContaining({
            a: 37,
            foo: 2, // <-- this does not cause an error as the compiler cannot infer the type completely
            // b: '123', <-- this would cause an error as `b` defined as number in fooType
        }));

        // explictly providing the type on objectContaining makes the guard more precise
        // as misspelled properties are detected as well
        expect(foo).not.toEqual(jasmine.objectContaining<fooType>({
            bar: '',
            // foo: 1, <-- this would cause an error as `foo` is not defined in fooType
        }));
    });

    describe("when used with a spy", () => {
        it("is useful for comparing arguments", () => {
            const callback = jasmine.createSpy('callback');

            callback({
                bar: "baz"
            });

            expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
                bar: "baz"
            }));
            expect(callback).not.toHaveBeenCalledWith(jasmine.objectContaining({
                c: 37
            }));
        });
    });
});

describe("jasmine.arrayContaining", () => {
    var foo: number[];

    beforeEach(() => {
        foo = [1, 2, 3, 4];
    });

    it("matches arrays with some of the values", () => {
        expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
        expect(foo).not.toEqual(jasmine.arrayContaining([6]));

        expect(foo).toBe(jasmine.arrayContaining([3, 1]));
        expect(foo).not.toBe(jasmine.arrayContaining([6]));
    });

    describe("when used with a spy", () => {
        it("is useful when comparing arguments", () => {
            const callback = jasmine.createSpy('callback');

            callback([1, 2, 3, 4]);

            expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
            expect(callback).not.toHaveBeenCalledWith(jasmine.arrayContaining([5, 2]));
        });
    });
});

describe("jasmine.arrayWithExactContents", () => {
    var foo: number[];

    beforeEach(() => {
        foo = [1, 2, 3, 4];
    });

    it("matches arrays with exactly the same values", () => {
        expect(foo).toEqual(jasmine.arrayWithExactContents([1, 2, 3, 4]));
        expect(foo).not.toEqual(jasmine.arrayWithExactContents([6]));

        expect(foo).toBe(jasmine.arrayWithExactContents([1, 2, 3, 4]));
        expect(foo).not.toBe(jasmine.arrayWithExactContents([6]));
    });

    describe("when used with a spy", () => {
        it("is useful when comparing arguments", () => {
            const callback = jasmine.createSpy('callback');

            callback([1, 2, 3, 4]);

            expect(callback).toHaveBeenCalledWith(jasmine.arrayWithExactContents([1, 2, 3, 4]));
            expect(callback).not.toHaveBeenCalledWith(jasmine.arrayWithExactContents([5, 2]));
        });
    });
});

describe("Manually ticking the Jasmine Clock", () => {
    var timerCallback: any;

    beforeEach(() => {
        timerCallback = jasmine.createSpy("timerCallback");
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it("causes a timeout to be called synchronously", () => {
        setTimeout(() => {
            timerCallback();
        }, 100);

        expect(timerCallback).not.toHaveBeenCalled();

        jasmine.clock().tick(101);

        expect(timerCallback).toHaveBeenCalled();
    });

    it("causes an interval to be called synchronously", () => {
        setInterval(() => {
            timerCallback();
        }, 100);

        expect(timerCallback).not.toHaveBeenCalled();

        jasmine.clock().tick(101);
        expect(timerCallback.calls.count()).toEqual(1);

        jasmine.clock().tick(50);
        expect(timerCallback.calls.count()).toEqual(1);

        jasmine.clock().tick(50);
        expect(timerCallback.calls.count()).toEqual(2);
    });

    describe("Mocking the Date object", () => {
        it("mocks the Date object and sets it to a given time", () => {
            const baseTime = new Date(2013, 9, 23);

            jasmine.clock().mockDate(baseTime);

            jasmine.clock().tick(50);
            expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
        });
    });
});

describe("Asynchronous specs", () => {
    var value: number;
    beforeEach((done: DoneFn) => {
        setTimeout(() => {
            value = 0;
            done();
        }, 1);
    });

    it("should support async execution of test preparation and expectations", (done: DoneFn) => {
        value += 1;
        expect(value).toBeGreaterThan(0);
        done();
    });

    describe("long asynchronous specs", () => {
        beforeEach((done: DoneFn) => {
            done();
        }, 1000);

        it("takes a long time", (done: DoneFn) => {
            setTimeout(() => {
                done();
            }, 9000);
        }, 10000);

        afterEach((done: DoneFn) => {
            done();
        }, 1000);
    });
});

describe("Fail", () => {
    it("should fail test when called without arguments", () => {
        fail();
    });

    it("should fail test when called with a fail message", () => {
        fail("The test failed");
    });

    it("should fail test when called an error", () => {
        fail(new Error("The test failed with this error"));
    });
});

// test based on http://jasmine.github.io/2.2/custom_equality.html
describe("custom equality", () => {
    const myCustomEquality: jasmine.CustomEqualityTester = function(first: any, second: any): boolean | void {
        if (typeof first === "string" && typeof second === "string") {
            return first[0] === second[1];
        }
    };

    beforeEach(() => {
        jasmine.addCustomEqualityTester(myCustomEquality);
    });

    it("should be custom equal", () => {
        expect("abc").toEqual("aaa");
    });

    it("should be custom not equal", () => {
        expect("abc").not.toEqual("abc");
    });
});

// test based on http://jasmine.github.io/2.2/custom_matcher.html
var customMatchers: jasmine.CustomMatcherFactories = {
    toBeGoofy: (util: jasmine.MatchersUtil, customEqualityTesters: jasmine.CustomEqualityTester[]) => {
        return {
            compare: (actual: any, expected: any): jasmine.CustomMatcherResult => {
                if (expected === undefined) {
                    expected = '';
                }
                const result: jasmine.CustomMatcherResult = { pass: false };

                result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);

                result.message = result.pass ?
                    `Expected ${actual} not to be quite so goofy` :
                    `Expected ${actual} to be goofy, but it was not very goofy`;

                return result;
            }
        };
    },
    toBeWithinRange: (util: jasmine.MatchersUtil, customEqualityTesters: jasmine.CustomEqualityTester[]) => {
        return {
            compare: (actual: any, floor: number, ceiling: number): jasmine.CustomMatcherResult => {
                const pass = actual >= floor && actual <= ceiling;
                const message = `expected ${actual} to be within range ${floor}-${ceiling}`;
                return { message, pass };
            },

            negativeCompare: (actual: any, floor: number, ceiling: number): jasmine.CustomMatcherResult => {
                const pass = actual < floor && actual > ceiling;
                const message = `expected ${actual} not to be within range ${floor}-${ceiling}`;
                return { message, pass };
            }
        };
    }
};
// add the custom matchers to interface jasmine.Matchers via TypeScript declaration merging
// if your test files import or export anything, you'll want to use:
// declare global {
//     namespace jasmine {
//         interface Matchers {
//             ...
//         }
//     }
// }
declare namespace jasmine {
    interface Matchers<T> {
        toBeGoofy(expected?: Expected<T>): boolean;
        toBeWithinRange(expected?: Expected<T>, floor?: number, ceiling?: number): boolean;
    }
}

describe("Custom matcher: 'toBeGoofy'", () => {
    beforeEach(() => {
        jasmine.addMatchers(customMatchers);
    });

    it("is available on an expectation", () => {
        expect({
            hyuk: 'gawrsh'
        }).toBeGoofy();
    });

    it("can take an 'expected' parameter", () => {
        expect({
            hyuk: 'gawrsh is fun'
        }).toBeGoofy({ hyuk: ' is fun' });
    });

    it("can take many 'expected' parameters", () => {
        expect(2).toBeWithinRange(1, 3);
    });

    it("can use the custom negativeCompare method", () => {
        const matcher = customMatchers["toBeWithinRange"](jasmine.matchersUtil, []);
        const result = matcher.negativeCompare!(1, 2, 3);

        expect(result.pass).toBe(false);
        expect(result.message).toBe("expected 1 not to be within range 2-3");
    });

    it("can be negated", () => {
        expect({
            hyuk: 'this is fun'
        }).not.toBeGoofy();
    });

    it("has a proper message on failure", () => {
        const actual = { hyuk: 'this is fun' };

        const matcher = customMatchers["toBeGoofy"](jasmine.matchersUtil, []);
        const result = matcher.compare(actual, null);

        expect(result.pass).toBe(false);
        expect(result.message).toBe(`Expected ${actual} to be goofy, but it was not very goofy`);
    });
});

// test based on http://jasmine.github.io/2.5/custom_reporter.html
var myReporter: jasmine.CustomReporter = {
    jasmineStarted: (suiteInfo: jasmine.SuiteInfo) => {
        console.log("Running suite with " + suiteInfo.totalSpecsDefined);
    },

    suiteStarted: (result: jasmine.CustomReporterResult) => {
        console.log(`Suite started: ${result.description} whose full description is: ${result.fullName}`);
    },

    specStarted: (result: jasmine.CustomReporterResult) => {
        console.log(`Spec started: ${result.description} whose full description is: ${result.fullName}`);
    },

    specDone: (result: jasmine.CustomReporterResult) => {
        console.log(`Spec: ${result.description} was ${result.status}`);
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; result.failedExpectations && i < result.failedExpectations.length; i += 1) {
            console.log("Failure: " + result.failedExpectations[i].message);
            console.log("Actual: " + result.failedExpectations[i].actual);
            console.log("Expected: " + result.failedExpectations[i].expected);
            console.log(result.failedExpectations[i].stack);
        }
        console.log(result.passedExpectations && result.passedExpectations.length);
    },

    suiteDone: (result: jasmine.CustomReporterResult) => {
        console.log(`Suite: ${result.description} was ${result.status}`);
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; result.failedExpectations && i < result.failedExpectations.length; i += 1) {
            console.log('AfterAll ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },

    jasmineDone: (runDetails: jasmine.RunDetails) => {
        console.log('Finished suite');
        console.log('Random:', runDetails.order.random);
    }
};

jasmine.getEnv().addReporter(myReporter);

describe("Randomize Tests", () => {
    it("should allow randomization of the order of tests", () => {
        expect(() => {
            const env = jasmine.getEnv();
            env.randomizeTests(true);
        }).not.toThrow();
    });

    it("should allow a seed to be passed in for randomization", () => {
        expect(() => {
            const env = jasmine.getEnv();
            env.randomizeTests(true);
            return env.seed(1234);
        }).not.toThrow();
    });
});

// Dest spces copied from jasmine project (https://github.com/jasmine/jasmine/blob/master/spec/core/SpecSpec.js)
describe("createSpyObj", function() {
    it("should create an object with spy methods and corresponding return values when you call jasmine.createSpyObj() with an object", function() {
        const spyObj = jasmine.createSpyObj('BaseName', {method1: 42, method2: 'special sauce'});

        expect(spyObj.method1()).toEqual(42);
        expect(spyObj.method1.and.identity()).toEqual('BaseName.method1');

        expect(spyObj.method2()).toEqual('special sauce');
        expect(spyObj.method2.and.identity()).toEqual('BaseName.method2');
    });

    it("should create an object with a bunch of spy methods when you call jasmine.createSpyObj()", function() {
        const spyObj = jasmine.createSpyObj('BaseName', ['method1', 'method2']);

        expect(spyObj).toEqual({ method1: jasmine.any(Function), method2: jasmine.any(Function) });
        expect(spyObj.method1.and.identity()).toEqual('BaseName.method1');
        expect(spyObj.method2.and.identity()).toEqual('BaseName.method2');
    });

    it("should allow you to omit the baseName and takes only an object", function() {
        const spyObj = jasmine.createSpyObj({method1: 42, method2: 'special sauce'});

        expect(spyObj.method1()).toEqual(42);
        expect(spyObj.method1.and.identity()).toEqual('unknown.method1');

        expect(spyObj.method2()).toEqual('special sauce');
        expect(spyObj.method2.and.identity()).toEqual('unknown.method2');
    });

    it("should allow you to omit the baseName and takes only a list of methods", function() {
        const spyObj = jasmine.createSpyObj(['method1', 'method2']);

        expect(spyObj).toEqual({ method1: jasmine.any(Function), method2: jasmine.any(Function) });
        expect(spyObj.method1.and.identity()).toEqual('unknown.method1');
        expect(spyObj.method2.and.identity()).toEqual('unknown.method2');
    });

    it("should throw if you pass an empty array argument", function() {
        expect(function() {
            jasmine.createSpyObj('BaseName', []);
        }).toThrow("createSpyObj requires a non-empty array or object of method names to create spies for");
    });

    it("should throw if you pass an empty object argument", function() {
        expect(function() {
            jasmine.createSpyObj('BaseName', {});
        }).toThrow("createSpyObj requires a non-empty array or object of method names to create spies for");
    });
});

(() => {
    // from boot.js
    const env = jasmine.getEnv();

    const htmlReporter = new jasmine.HtmlReporter();
    env.addReporter(htmlReporter);

    const specFilter = new jasmine.HtmlSpecFilter();
    env.specFilter = (spec) => {
        return specFilter.matches(spec.getFullName());
    };

    const currentWindowOnload = window.onload;
    window.onload = () => {
        if (currentWindowOnload) {
            (currentWindowOnload as any)(null);
        }
        htmlReporter.initialize();
        env.execute();
    };
})();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
jasmine.MAX_PRETTY_PRINT_DEPTH = 40;
