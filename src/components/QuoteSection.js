import CoverageLimits from './CoverageLimits';
import CoverageOptions from './CoverageOptions';
import Deductibles from './Deductables';

const QuoteSection = ({quote}) => {
    const {
        additionalInterests,
        coverageLimits,
        coverageOptions,
        deductibles,
        policyHolderMailingAddress,
        policyHolders,
        underwritingAnswers
    } = quote.properties

    console.log('quote', quote);

    return (
        <div>
            <div>Coverage Limits</div>
            <CoverageLimits coverageData={coverageLimits} />
            <div>Coverage Options</div>
            <CoverageOptions coverageOptions={coverageOptions} />
            <Deductibles deductiblesData={deductibles}/>
        </div>
    )
}

export default QuoteSection;
