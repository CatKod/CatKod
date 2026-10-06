import ConsoleRail from '@/components/ConsoleRail';
import Hero from '@/components/Hero';
import Industrial from '@/components/Industrial';
import Work from '@/components/Work';
import Toolchain from '@/components/Toolchain';
import About from '@/components/About';

export default function Page() {
  return (
    <div className="shell">
      <ConsoleRail />

      {/* The narrative column. Reading order matches DOM order, and the console
          pane is a sibling rather than a wrapper, so a screen reader reaches
          the content without traversing the navigation first. */}
      <main className="column" id="content">
        <div id="overview">
          <Hero />
        </div>
        <Industrial />
        <Work />
        <Toolchain />
        <About />
      </main>
    </div>
  );
}
