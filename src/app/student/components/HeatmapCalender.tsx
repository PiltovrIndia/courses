export default function HeatmapCalender({
  startDate,
  endDate,
  dataValues,
}: {
  startDate: any;
  endDate: any;
  dataValues: any;
}) {
  let sDate: any = new Date(startDate);
  let eDate: any = new Date(endDate);
  const daysInMonth =
    Math.ceil((eDate.getTime() - sDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const calenderGrid = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(sDate);
    date.setDate(sDate.getDate() + i);
    return date.toISOString().slice(0, 10);
  });
  const highestValue = dataValues?.reduce(
    (a: number, b: any) => Math.max(a, b.count),
    -Infinity
  );
  const getIntensity = (activityCount: number) => {
    return highestValue !== 0 ? Number(activityCount / highestValue) : 0;
  };
  const getColorFromIntensity = (intensity: number) => {
    // const colorCodes = [
    //   "#FFEEEE",
    //   "#FFCCCC",
    //   "#FFAAAA",
    //   "#FF8888",
    //   "#FF6666",
    //   "#FF4444",
    // ];
    const colorCodes = [
      "#CCDDCC",
      "#AADDAA",
      "#88DD88",
      "#66DD66",
      "#44DD44",
      "#22DD22",
    ];
   
    const colorIndex = Math.min(
      Math.floor(intensity * colorCodes.length),
      colorCodes.length - 1
    );
    return colorCodes[colorIndex];
  };
  return (
    <div
      className="grid grid-flow-col gap-1"
      style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr)" }}
    >
      {calenderGrid.map((day, index) => {
        const activityCount =
          dataValues.find((item: any) => item.date === day)?.count || 0;
        const intensity = getIntensity(activityCount);
        const color = getColorFromIntensity(intensity);
        return (
          <span
            key={index}
            className="w-4 h-4 rounded cursor-pointer bg-gray-400"
            title={`${activityCount} commits on ${day}`}
            style={{
              backgroundColor: `${
                activityCount == 0 ? "#ffffff10" : String(color)
              }`,
            }}
          ></span>
        );
      })}
    </div>
  );
}
