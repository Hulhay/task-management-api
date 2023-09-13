const { stringToDateTime } = require("./time");

describe("stringToDateTime", () => {
  it("should convert date-time string to date object", () => {
    const dateTimeString = "2023-09-01 12:30:45";
    const expectedDate = new Date(2023, 8, 1, 12, 30, 45);

    const result = stringToDateTime(dateTimeString);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toBe(expectedDate.getTime());
  });
});
