using AElf.Sdk.CSharp.State;
using AElf.Standards.ACS1;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DeTreMan;

public partial class DeTreManContractState : ContractState
{
    public MappedState<Address, DeTreManProfitScheme> DeTreManProfitSchemes { get; set; }

    /// <summary>
    ///     Contract address (Manager address) -> Beneficiary address -> Lock id.
    /// </summary>
    public MappedState<Address, Address, Hash> LockIds { get; set; }

    public MappedState<Hash, Timestamp> LockTimestamp { get; set; }

    public MappedState<string, MethodFees> TransactionFees { get; set; }
    public SingletonState<AuthorityInfo> MethodFeeController { get; set; }
}