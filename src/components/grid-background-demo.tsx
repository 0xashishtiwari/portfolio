export default function GridBackgroundDemo() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-background dark:bg-black pointer-events-none">
      <div
        className="absolute inset-0
        [background-size:40px_40px]
        [background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]
        dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-background dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
    </div>
  );
}