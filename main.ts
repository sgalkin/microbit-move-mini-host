radio.onReceivedNumber(function (receivedNumber) {
    handleCommand(receivedNumber)
})
input.onButtonPressed(Button.A, function () {
    setVelocity(90)
    enableLight()
})
function handleCommand (value: number) {
    command_value = value % 256
    command = 256 * Math.trunc(value / 256)
    if (command == control_command) {
        handleControlCommand(command_value)
    } else if (command == velocity_command) {
        handleVelocityCommand(command_value)
    } else if (command == turn_command) {
        basic.showString("?")
    } else if (command == light_command) {
        handleLightCommand(command_value)
    } else {
        basic.showIcon(IconNames.No)
    }
}
function enableLight () {
    strip.range(0, 1).showColor(neopixel.colors(NeoPixelColors.Red))
    strip.range(1, 1).showColor(neopixel.colors(NeoPixelColors.Orange))
    strip.range(2, 1).showColor(neopixel.colors(NeoPixelColors.Green))
    strip.range(3, 1).showColor(neopixel.colors(NeoPixelColors.Blue))
    strip.range(4, 1).showColor(neopixel.colors(NeoPixelColors.Violet))
}
function handleVelocityCommand (value: number) {
    setVelocity(Math.map(value, -100, 100, -90, 90))
}
function turn (roll: number) {
    pins.servoWritePin(AnalogPin.P1, 90 + roll)
    pins.servoWritePin(AnalogPin.P2, 90 + roll)
}
input.onButtonPressed(Button.AB, function () {
    kitronik_servo_lite.stop()
})
input.onButtonPressed(Button.B, function () {
    setVelocity(-90)
    disableLight()
})
function handleLightCommand (value: number) {
    if (value == 0) {
        disableLight()
    } else {
        enableLight()
    }
}
function disableLight () {
    strip.clear()
    strip.show()
}
function handleControlCommand (value: number) {
    if (value == 1) {
        kitronik_servo_lite.stop()
        disableLight()
    } else {
        basic.showIcon(IconNames.Skull)
    }
}
function setVelocity (velocity: number) {
    pins.servoWritePin(AnalogPin.P1, 90 - velocity)
    pins.servoWritePin(AnalogPin.P2, 90 + velocity)
}
let command = 0
let command_value = 0
let strip: neopixel.Strip = null
let light_command = 0
let turn_command = 0
let velocity_command = 0
let control_command = 0
kitronik_servo_lite.stop()
radio.setGroup(42)
control_command = 0
velocity_command = 256
turn_command = 512
light_command = 768
strip = neopixel.create(DigitalPin.P0, 5, NeoPixelMode.RGB)
disableLight()
loops.everyInterval(200, function () {
    strip.rotate(1)
    strip.show()
})
