<script lang="ts">
  import { smileIndex, smiles, alerts, recents, recent } from "../data/store";
  import { copy } from "svelte-copy";
  import "../index.css";
  import Sidebar from "./Sidebar.svelte";
  import Alert from "./Alert.svelte";

  const onCopy = (e: CustomEvent<string>): void => {
    let temp = $recents;
    const element = e.detail;
    if (temp.indexOf(element) === 0) {
      return;
    }
    if (temp.includes(element)) {
      temp.splice(temp.indexOf(element), 1);
      temp.unshift(element);
    } else if (temp.length === 32) {
      temp.pop();
      temp.unshift(element);
    } else {
      temp.unshift(element);
    }
    $recents = temp;
  };
</script>

<div class="min-w-[600px] min-h-[600px] scrollbar  scrollbar-thumb-black scrollbar-track-white">
  <Alert />
  <Sidebar />
  <div class="flex bg-white">
    <div class="ml-20 p-5 w-full">
      <!-- svelte-ignore missing-declaration -->
      {#if $smileIndex === 90}
        <h2 class="text-xl font-semibold mb-5">{recent}</h2>
        <div class="my-grid">
          {#each $recents as data}
            <button
              on:svelte-copy={(event) => ($alerts = event.detail)}
              on:svelte-copy={onCopy}
              use:copy={data}
              class="btn-grid"
            >
              {data}
            </button>
          {/each}
        </div>
      {:else}
        {#each smiles as smile, i}
          {#if $smileIndex === i}
            <h2 class="text-xl font-semibold mb-5">{smile.label}</h2>
            <div class="my-grid">
              {#each smile.data as data}
                <button
                  on:svelte-copy={(event) => ($alerts = event.detail)}
                  on:svelte-copy={onCopy}
                  use:copy={data}
                  class="btn-grid"
                >
                  {data}
                </button>
              {/each}
            </div>
          {/if}
        {/each}
      {/if}
    </div>
  </div>
</div>
