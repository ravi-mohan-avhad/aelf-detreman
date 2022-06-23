using AElf.Contracts.MultiToken;
using AElf.Contracts.Parliament;
using AElf.Contracts.Profit;

namespace AElf.Contracts.DeTreMan;

public partial class DeTreManContractState
{
    internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    internal ProfitContractContainer.ProfitContractReferenceState ProfitContract { get; set; }
    internal ParliamentContractContainer.ParliamentContractReferenceState ParliamentContract { get; set; }
}