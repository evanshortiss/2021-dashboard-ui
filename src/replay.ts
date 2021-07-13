import { Drash } from "https://deno.land/x/drash@v1.4.4/mod.ts";

type Turn = {
    attacker: string;
    hit?: boolean;
    origin: number[];
}

type Matches = {
  [key: string]: {
      hit: boolean
      ai: boolean
      x: number
      y: number
  }[]
}

const REPLAY_SERVER = Deno.env.get("REPLAY_SERVER");

export class ReplayResource extends Drash.Http.Resource {
    static paths = ["/replay-json/"];
    public async GET() {
        const url = new URL('/replays?count=12', REPLAY_SERVER)
        const data = await (await fetch(url)).json() as Matches
        const replays: Turn[][] = Object.keys(data).map((key) => {
          const matchTurns = data[key]
          return matchTurns.map(t => {
            return {
              attacker: t.ai ? 'AI' : 'Human',
              hit: t.hit,
              origin: [t.x, t.y]
            } as Turn
          })
        })

        this.response.headers.set("Content-Type","application/json");
        this.response.body = replays;
        return this.response;
    }
}

export class ReplayVisuals extends Drash.Http.Resource {
  static paths = ["/replay"];
  public GET() {
      this.response.body = this.response.render(
          "/replay.html"
      )

      return this.response;
  }
}
