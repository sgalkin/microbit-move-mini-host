radio.onReceivedNumber(function (receivedNumber) {
    setVelocity(receivedNumber)
})
input.onButtonPressed(Button.A, function () {
    setVelocity(90)
    enableLight()
})
function enableLight () {
    strip.range(0, 1).showColor(neopixel.colors(NeoPixelColors.Red))
    strip.range(1, 1).showColor(neopixel.colors(NeoPixelColors.Orange))
    strip.range(2, 1).showColor(neopixel.colors(NeoPixelColors.Green))
    strip.range(3, 1).showColor(neopixel.colors(NeoPixelColors.Blue))
    strip.range(4, 1).showColor(neopixel.colors(NeoPixelColors.Violet))
}
input.onButtonPressed(Button.AB, function () {
    setVelocity(0)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "halt") {
        setVelocity(0)
    }
})
input.onButtonPressed(Button.B, function () {
    setVelocity(-90)
    disableLight()
})
radio.onReceivedValue(function (name, value) {
    if (name == "light") {
        if (0 == 0) {
            disableLight()
        } else {
            enableLight()
        }
    }
})
function disableLight () {
    strip.clear()
    strip.show()
}
function setVelocity (velocity: number) {
    velocity = velocity % 91
    pins.servoWritePin(AnalogPin.P1, 90 - velocity)
    pins.servoWritePin(AnalogPin.P2, 90 + velocity)
}
let velocity = 0
let strip: neopixel.Strip = null
setVelocity(0)
radio.setGroup(42)
strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
disableLight()
basic.forever(function () {
    basic.pause(200)
    strip.rotate(1)
    strip.show()
})
