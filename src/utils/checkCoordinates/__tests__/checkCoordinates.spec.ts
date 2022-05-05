import {checkCoordinates} from "../checkCoordinates";

describe('utils:checkCoordinates', function () {
    it('should return false on the wrong coordinates', function () {
        expect(checkCoordinates(-20, 99)).toBe(false)
    });

    it('should return true when the coordinates are within bounds', function () {
        expect(checkCoordinates(0, 0)).toBe(true)
    });
});