<script>
  import { getData, searchSymbol } from '../utils/data-provider'

  let response = [];
  async function loadData() {
    const res = await getData('all-data', '5minute')
    response = res || [];
  };

  function searchSymbolHandler(e) {
    searchSymbol({action: 'search', symbol: 'UBL'})
  }

</script>

<section class="w-96 h-80">
  <div class="flex flex-col">
    <button class="p-2 bg-gray-400" on:click={loadData()}>Get Data</button>
    <button class="p-2 mt-2 bg-gray-400" on:click={e => searchSymbolHandler(e)}
      >Search</button
    >
    <span>{JSON.stringify(response)}</span>
  </div>
</section>
