let isPressedA = 0
let randomNumber = 0
let isPressedB = 0
let counter = 0
let counter_hold = 0
let waitTime = 12

input.onButtonPressed(Button.A, function () {
    counter_hold = 0
    if (counter < 99) {
        counter += 1
        whaleysans.showNumber(counter)
    }
})

input.onButtonPressed(Button.B, function () {
    counter_hold = 0
    if (counter > 0) {
        counter += -1
        whaleysans.showNumber(counter)
    }
})

input.onGesture(Gesture.Shake, function () {
    randomNumber = Math.floor(Math.random() * counter)
    whaleysans.showNumber(randomNumber)
    basic.pause(2500)
})

function handleButton () {
    if (input.buttonIsPressed(Button.A) && isPressedB == 0 && counter < 99) {
        counter += 1
    }
    if (input.buttonIsPressed(Button.B) && isPressedB == 1 && counter > 0) {
        counter += -1
    }
    if (input.buttonIsPressed(Button.AB)) {
        counter = 0
    }
    whaleysans.showNumber(counter)
}

basic.forever(function () {
    basic.pause(20)
    serial.writeLine("" + (counter))
    if (counter_hold > waitTime) {
        handleButton()
    } else {
        if (input.buttonIsPressed(Button.A)) {
            isPressedB = 0
            isPressedA = 1
            counter_hold += 1
        }
        if (input.buttonIsPressed(Button.B)) {
            isPressedB = 1
            isPressedA = 0
            counter_hold += 1
        }
    }
    if (!(input.buttonIsPressed(Button.A)) && !(input.buttonIsPressed(Button.B))) {
        counter_hold = 0
    }
})
